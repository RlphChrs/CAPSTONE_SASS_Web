import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadHeader from "../components/UploadHeader";
import FileItem from "../components/FileItem";
import SideNav from "../components/SideNav";
import DashboardHeader from "../components/DashboardHeader";
import UploadedFilesList from "../components/UploadedFilesList";
import { uploadFile, getUploadedFiles, checkChatbotReady } from "../api/saoAPI";

const UploadKnowledgePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [chatbotReady, setChatbotReady] = useState(false);
  const token = localStorage.getItem("saoToken");
  const schoolId = localStorage.getItem("schoolId");

  // Fetch uploaded files on load
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const files = await getUploadedFiles(token);
        setUploadedFiles(files);
      } catch (err) {
        setError("Failed to load files");
      }
    };
    fetchFiles();
  }, [token]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const newFile = {
      id: selectedFile.name + Date.now(),
      fileName: selectedFile.name,
      fileSize: (selectedFile.size / 1024).toFixed(2),
      progress: 0,
      status: "uploading",
    };

    setUploadingFiles((prev) => [...prev, newFile]);

    try {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadingFiles((prev) =>
          prev.map((file) =>
            file.id === newFile.id
              ? { ...file, progress, status: progress >= 100 ? "completed" : "uploading" }
              : file
          )
        );

        if (progress >= 100) {
          clearInterval(interval);

          setTimeout(async () => {
            const response = await uploadFile(selectedFile, token);
            setUploadedFiles((prev) => [...prev, response]);
            setUploadingFiles((prev) => prev.filter((file) => file.id !== newFile.id));

            // ✅ Begin polling for chatbot readiness
            let attempts = 0;
            const maxAttempts = 20;
            const pollInterval = setInterval(async () => {
              try {
                const status = await checkChatbotReady(token, schoolId);
                if (status.ready) {
                  clearInterval(pollInterval);
                  if (!localStorage.getItem("chatbotReadyPopupShown")) {
                    setChatbotReady(true);
                    localStorage.setItem("chatbotReadyPopupShown", "true");
                  }
                }
              } catch (e) {
                console.error("Failed to check chatbot readiness:", e);
              }

              if (++attempts >= maxAttempts) {
                clearInterval(pollInterval);
                console.warn("Stopped polling after max attempts");
              }
            }, 5000); // every 5s
          }, 1000);
        }
      }, 500);
    } catch (err) {
      setError("Upload failed");
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <DashboardHeader />

        {/* Main Content Area */}
        <div className="p-6 flex w-full gap-6">
          {/* Left Side - Upload Section */}
          <div className="flex-1 mt-6 w-full max-w-4xl h-89">
            <div className="w-full bg-white p-6 rounded-lg shadow-md mt-8">
              <UploadHeader />
            </div>

            <div className="mt-4 bg-white p-6 rounded-lg shadow-md h-170">
              <h2 className="text-lg font-semibold text-gray-700 mb-2 text-left">Upload Files</h2>
              <p className="text-sm text-gray-500 mb-4 text-left">
                Select and upload the files of your choice
              </p>

              <div
                className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <FaCloudUploadAlt className="text-gray-400 text-4xl mb-2" />
                <p className="text-gray-500">Drag & Drop files here or click below</p>
                <p className="text-gray-400 text-sm">JPEG, PNG, PDF, and MP4 formats, up to 50MB</p>
                <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                <label
                  htmlFor="fileInput"
                  className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer"
                >
                  Browse File
                </label>
              </div>

              {selectedFile && (
                <p className="text-sm text-black mt-2">Selected File: {selectedFile.name}</p>
              )}

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleUpload}
                  className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
                  disabled={uploading || !selectedFile}
                >
                  <FaCloudUploadAlt className="mr-2 text-lg" />
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>

              <div className="mt-6 space-y-2">
                {uploadingFiles.map((file) => (
                  <FileItem
                    key={file.id}
                    fileName={file.fileName}
                    fileSize={file.fileSize}
                    progress={file.progress}
                    status={file.status}
                  />
                ))}
              </div>

              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </div>
          </div>

          {/* Right Side - Uploaded Files List */}
          <div className="w-1/3 mt-6">
            <UploadedFilesList uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
          </div>
        </div>
      </div>

      {/* ✅ Chatbot Ready Popup */}
      {chatbotReady && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">🎉 Chatbot Ready</h2>
            <p className="text-gray-600">The chatbot is now ready to use for your school.</p>
            <button
              onClick={() => setChatbotReady(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadKnowledgePage;
