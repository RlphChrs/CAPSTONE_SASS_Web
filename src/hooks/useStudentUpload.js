import { useState } from 'react';
import { uploadStudentList } from '../api/saoAPI';

const useStudentUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = async (token, schoolId) => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('File', file);
    formData.append('schoolId', schoolId);

    try {
      setLoading(true);
      const res = await uploadStudentList(formData, token);

      setStatus(
        `✅ ${res.message} — ${res.totalUploaded} total | ` +
        `${res.newRecords} new | ${res.updatedRecords} updated | ` +
        `${res.skippedRegistered} skipped (already registered)`
      );
    } catch (error) {90
      console.error('❌ Upload error:', error);
      setStatus('❌ Upload failed. Please check the file format or try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    status,
    loading,
    handleFileChange,
    handleUpload,
  };
};

export default useStudentUpload;
