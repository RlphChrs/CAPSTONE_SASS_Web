import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadHeader from "../components/UploadHeader";
import FileItem from "../components/FileItem";
import ProgressSection from "../components/ProgressSection";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

const UploadKnowledgePage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <TopNav />

        {/* Main Content Area */}
        <div className="p-6 flex flex-col w-full">
          {/* Row for Upload Header, File Upload Section, and Progress Section */}
          <div className="flex w-full gap-6">
            {/* Left Side - Upload Header & File Upload Section */}
            <div className="flex-1 mt-6 w-full max-w-4xl h-89">
              
              {/* Upload Header - Adjusted width to match File Upload Section */}
              <div className="w-full bg-white p-6 rounded-lg shadow-md mt-8">
                <UploadHeader />
              </div>

              {/* File Upload Section */}
              <div className="mt-4 bg-white p-6 rounded-lg shadow-md h-170">
                <h2 className="text-lg font-semibold text-gray-700 mb-2 text-left">
                  Upload Files
                </h2>
                <p className="text-sm text-gray-500 mb-4 text-left">
                  Select and upload the files of your choice
                </p>

                {/* Upload Box */}
                <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center">
                  <FaCloudUploadAlt className="text-gray-400 text-4xl mb-2" />
                  <p className="text-gray-500">Choose a file or drag & drop it here</p>
                  <p className="text-gray-400 text-sm">
                    JPEG, PNG, PDF, and MP4 formats, up to 50MB
                  </p>
                  <button className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    Browse File
                  </button>
                </div>

                {/* File Items */}
                <div className="mt-4 space-y-2">
                  <FileItem fileName="my-cv.pdf" fileSize="120" progress={60} status="uploading" />
                  <FileItem fileName="Google-certificate.pdf" fileSize="94" progress={100} status="Completed" />
                </div>

                {/* Upload Button - Aligned Right */}
                <div className="flex justify-end mt-6">
                  <button className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200">
                    <FaCloudUploadAlt className="mr-2 text-lg" /> Upload
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Progress Section (Unmoved) */}
            <div className="w-1/3 mt-15">
              <ProgressSection progress={70} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadKnowledgePage;
