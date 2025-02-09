import React from "react";

const UploadHeader = () => {
  return (
    <div className="bg-white text-black p-4 flex items-left rounded-md shadow-md w-full max-w-4xl mt-1 mx-auto">
      {/* Chatbot Image */}
      <img src="/image/picture.png" alt="Chatbot" className="w-40 h-20 object-cover rounded-md ml-1" />

      {/* Text Content */}
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold text-left">Upload Knowledge for your Chatbot</h2>
        <p className="text-sm text-gray-600 mt-1 text-left">
          Your input helps the chatbot provide better responses. Together, we can build a more intelligent system for an improved user experience.
        </p>
      </div>
    </div>
  );
};

export default UploadHeader;
