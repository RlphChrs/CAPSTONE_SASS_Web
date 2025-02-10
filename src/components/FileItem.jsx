import React from "react";
import { FaFilePdf, FaTrash, FaCheckCircle } from "react-icons/fa";

const FileItem = ({ fileName, fileSize, progress, status }) => {
  return (
    <div className="bg-white p-3 flex items-center justify-between border rounded-md shadow-sm">
      <div className="flex items-center">
        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center mr-2">
          <FaFilePdf className="mr-1" /> PDF
        </span>
        <div>
          <p className="text-sm font-semibold">{fileName}</p>
          <p className="text-xs text-gray-500">{fileSize} KB</p>
        </div>
      </div>

      <div className="w-32">
        {status === "uploading" ? (
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        ) : (
          <span className="text-green-600 font-semibold flex items-center">
            <FaCheckCircle className="mr-1" /> {status}
          </span>
        )}
      </div>

      {status === "completed" ? (
        <FaTrash className="text-gray-500 cursor-pointer" />
      ) : (
        <span className="text-gray-500 text-xs">Uploading...</span>
      )}
    </div>
  );
};

export default FileItem;
