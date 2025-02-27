import { useState, useEffect } from "react";
import { uploadFile, getUploadedFiles } from "../api/saoAPI";

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("saoToken");

  //  Fetch Uploaded Files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getUploadedFiles(token);
        setUploadedFiles(data);
      } catch (err) {
        setError("Failed to load files");
      }
    };
    fetchFiles();
  }, [token]);

  //  Upload File Hook
  const upload = async (file) => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const response = await uploadFile(file, token);
      setUploadedFiles([...uploadedFiles, response]); 
      setUploadProgress(100);
    } catch (err) {
      setError("Upload failed");
    }

    setUploading(false);
  };

  return { uploadedFiles, upload, uploading, uploadProgress, error };
};
