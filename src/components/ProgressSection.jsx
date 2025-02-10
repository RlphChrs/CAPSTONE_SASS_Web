import React from "react";

const ProgressSection = ({ progress }) => {
  // Example processing files data
  const processingFiles = [
    { name: "SAO Resources.pdf", progress: 80, status: "Completed" },
    { name: "SAO Resources.pdf", progress: 60, status: "Completed" },
    { name: "SAO Resources.pdf", progress: 45, status: "Completed" },
    { name: "SAO Resources.pdf", progress: 75, status: "Completed" },
    { name: "SAO Resources.pdf", progress: 50, status: "Completed" },
  ];

  return (
    <div className="bg-white p-6 rounded-md shadow w-full max-w-lg">
      {/* Progress Section */}
      <h3 className="text-lg font-semibold text-gray-900 text-left">Progress</h3>
      <div className="flex flex-col items-center mt-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            {/* Background Circle */}
            <circle
              className="text-gray-300 stroke-current"
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              strokeWidth="3"
            />
            {/* Progress Circle */}
            <circle
              className="text-blue-600 stroke-current transition-all duration-300 ease-in-out"
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              strokeWidth="3"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
            />
          </svg>
          {/* Progress Percentage */}
          <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-gray-900">
            {progress}%
          </span>
        </div>
        <p className="text-md font-medium text-gray-800 mt-2">Uploading</p>
      </div>

      {/* Processing Section */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-900 mb-3 text-left">Processing</h4>
        {processingFiles.map((file, index) => (
          <div key={index} className="mb-3">
            <p className="text-sm text-gray-800">{file.name}</p>
            <div className="w-full bg-gray-200 h-2 rounded-md mt-1">
              <div
                className="bg-blue-600 h-2 rounded-md"
                style={{ width: `${file.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Uploaded Files Section */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-900 mb-3 text-left">Uploaded Files</h4>
        {processingFiles.map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-2 shadow-sm"
          >
            <div className="flex items-center">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">
                PDF
              </span>
              <p className="text-sm text-gray-900">{file.name}</p>
            </div>
            <p className="text-xs text-gray-600">January 11, 2024 10:32 PM</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSection;
