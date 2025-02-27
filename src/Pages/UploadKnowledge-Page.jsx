import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadHeader from "../components/UploadHeader";
import ProgressSection from "../components/ProgressSection";
import SideNav from "../components/SideNav";
import DashboardHeader from "../components/DashboardHeader";
import { useFileUpload } from "../hooks/useFileUpload";

const UploadKnowledgePage = () => {
  const { uploadedFiles, upload, uploading, uploadProgress } = useFileUpload();
  const [selectedFile, setSelectedFile] = useState(null);

  //  Handle File Selection (Browse)
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //  Handle Drag & Drop
  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  //  Upload File
  const handleUpload = () => {
    if (selectedFile) {
      upload(selectedFile);
    }
  };

  return (
    <div className="min-h-screen flex">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="p-6 flex flex-col w-full">
          <div className="flex w-full gap-6">
            <div className="flex-1 mt-6 w-full max-w-4xl h-89">
              <div className="w-full bg-white p-6 rounded-lg shadow-md mt-8">
                <UploadHeader />
              </div>

              <div className="mt-4 bg-white p-6 rounded-lg shadow-md h-170">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Upload Files</h2>
                <p className="text-sm text-gray-500 mb-4">Select and upload the files of your choice</p>

                {/* Drag & Drop Zone */}
                <div
                  className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <FaCloudUploadAlt className="text-gray-400 text-4xl mb-2" />
                  <p className="text-gray-500">Drag & drop a file here</p>
                  <p className="text-gray-400 text-sm">JPEG, PNG, PDF, and MP4 formats, up to 50MB</p>
                  <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                  <label htmlFor="fileInput" className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer">
                    Browse File
                  </label>
                </div>

                {/* Selected File */}
                {selectedFile && (
                  <div className="mt-4 p-2 bg-gray-100 rounded-lg flex justify-between items-center">
                    <span>{selectedFile.name}</span>
                    <span className="text-sm text-gray-500">{Math.round(selectedFile.size / 1024)} KB</span>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex justify-end mt-6">
                  <button onClick={handleUpload} className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200" disabled={uploading}>
                    <FaCloudUploadAlt className="mr-2 text-lg" />
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-1/3 mt-15">
              <ProgressSection progress={uploadProgress} />
            </div>
          </div>

          {/* Uploaded Files List */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Uploaded Files</h2>
            <ul className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="p-2 border-b flex justify-between items-center">
                  <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {file.fileName}
                  </a>
                  <span className="text-sm text-gray-500">{Math.round(file.fileSize / 1024)} KB</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadKnowledgePage;
