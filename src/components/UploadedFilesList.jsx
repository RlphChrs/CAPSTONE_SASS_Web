import React, { useState } from "react";
import { FaFilePdf, FaTrash } from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_UPLOAD_URL;

const UploadedFilesList = ({ uploadedFiles, setUploadedFiles }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(selectedFile === file ? null : file);
  };

  const handleDelete = async (e, file) => {
    e.stopPropagation();
    
    const token = localStorage.getItem("saoToken"); 

    if (!token) {
      alert("Unauthorized: No token found.");
      return;
    }
    
    try {
      const response = await axios.delete(`${API_URL}/uploads/delete-file`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        data: { fileId: file.id, fileUrl: file.fileUrl },
      });

      if (response.status === 200) { 
        setSelectedFile(null);
        alert("File deleted successfully.");
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Failed to delete file:", error);
      alert("Failed to delete file.");
    }
  };

  return (
    <div className="w-full bg-white mt-8 p-6 rounded-lg shadow-md border border-gray-300">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Uploaded Files</h3>
      <div className="space-y-3">
        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            className="relative flex flex-col border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition overflow-hidden cursor-pointer"
            onClick={() => handleFileClick(file)}
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3 w-full">
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center">
                  <FaFilePdf className="mr-1" /> PDF
                </span>
                <p className="text-sm font-semibold text-gray-800 truncate w-3/5">{file.fileName}</p>
                <p className="text-xs text-gray-500 w-2/5 text-right">
                  {file.uploadedAt && !isNaN(new Date(file.uploadedAt).getTime())
                    ? new Date(file.uploadedAt).toLocaleString()
                    : "Invalid Date"}
                </p>
              </div>
            </div>
            {selectedFile === file && (
              <div className="absolute right-2 top-2 bg-white p-2 rounded shadow-md flex items-center">
                <button
                  className="text-red-500 hover:text-red-700 flex items-center space-x-2"
                  onClick={(e) => handleDelete(e, file)}
                >
                  <FaTrash />
                  <span className="text-xs text-gray-700 ml-1">Delete</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedFilesList;