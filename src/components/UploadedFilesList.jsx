import React from "react";
import FileItem from "./FileItem";

const UploadedFilesList = () => {
  const uploadedFiles = [
    { fileName: "my-cv.pdf", fileSize: 120, progress: 50, status: "uploading" },
    { fileName: "Google-certificate.pdf", fileSize: 94, progress: 100, status: "completed" }
  ];

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h3 className="text-md font-semibold mb-2">Uploaded Files</h3>
      <div className="space-y-2">
        {uploadedFiles.map((file, index) => (
          <FileItem
            key={index}
            fileName={file.fileName}
            fileSize={file.fileSize}
            progress={file.progress}
            status={file.status}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadedFilesList;
