import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadHeader from "../components/UploadHeader";
import FileItem from "../components/FileItem";
import SideNav from "../components/SideNav";
import DashboardHeader from "../components/DashboardHeader";
import UploadedFilesList from "../components/UploadedFilesList";
import { uploadFile, getUploadedFiles } from "../api/saoAPI";



const UploadKnowledgePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingFiles, setUploadingFiles] = useState([]); // Uploading files list
  const [uploadedFiles, setUploadedFiles] = useState([]); // Completed files list
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("saoToken");

  // Fetch files on page load
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

  // Handle File Selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  // Handle Drag & Drop
  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Upload File with Simulated Progress
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
      // Simulate Upload Progress
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
            setUploadedFiles((prev) => [...prev, response]); // Add to completed list
            setUploadingFiles((prev) => prev.filter((file) => file.id !== newFile.id)); // Remove from uploading list
          }, 1000); // Delay before moving to uploaded files
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
        <div className="p-6 flex w-full gap-6"> {/* Updated flex styling to align properly */}
          {/* Left Side - Upload Section */}
          <div className="flex-1 mt-6 w-full max-w-4xl h-89">
            {/* Upload Header */}
            <div className="w-full bg-white p-6 rounded-lg shadow-md mt-8">
              <UploadHeader />
            </div>

            {/* File Upload Section */}
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md h-170">
              <h2 className="text-lg font-semibold text-gray-700 mb-2 text-left">Upload Files</h2>
              <p className="text-sm text-gray-500 mb-4 text-left">Select and upload the files of your choice</p>

              {/* Upload Box with Drag & Drop */}
              <div
                className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <FaCloudUploadAlt className="text-gray-400 text-4xl mb-2" />
                <p className="text-gray-500">Drag & Drop files here or click below</p>
                <p className="text-gray-400 text-sm">JPEG, PNG, PDF, and MP4 formats, up to 50MB</p>
                <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                <label htmlFor="fileInput" className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer">Browse File</label>
              </div>

              {/* Show Selected File */}
              {selectedFile && <p className="text-sm text-black mt-2">Selected File: {selectedFile.name}</p>}

              {/* Upload Button */}
              <div className="flex justify-end mt-6">
                <button onClick={handleUpload} className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200" disabled={uploading || !selectedFile}>
                  <FaCloudUploadAlt className="mr-2 text-lg" />
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>

              {/* FileItem Indicator Below Button */}
              <div className="mt-6 space-y-2">
                {uploadingFiles.map((file) => (
                  <FileItem key={file.id} fileName={file.fileName} fileSize={file.fileSize} progress={file.progress} status={file.status} />
                ))}
              </div>

              {/* Error Message */}
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </div>
          </div>

          {/* Right Side - Uploaded Files List */}
          <div className="w-1/3 mt-6"> {/* Ensures proper alignment with Upload Header */}
          <UploadedFilesList uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadKnowledgePage;
