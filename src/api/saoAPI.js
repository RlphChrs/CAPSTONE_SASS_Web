import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const Upload_URL = import.meta.env.VITE_UPLOAD_URL;

//Registration
export const registerSAO = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register/sao`, formData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.message);
    throw error;
  }
};

//Login
export const loginSAO = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message);
    throw error;
  }
};

//File Upload
export const uploadFile = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append('File', file); // 

    const response = await axios.post(`${Upload_URL}/uploads/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
        Authorization: `Bearer ${token}` // ✅ Send JWT Token
      },
      onUploadProgress: (progressEvent) => {
        console.log("Upload Progress:", Math.round((progressEvent.loaded * 100) / progressEvent.total));
      }
    });

    return response.data; // ✅ Returns uploaded file URL
  } catch (error) {
    console.error('File upload failed:', error.response?.data?.message);
    throw error;
  }
};

//Get Uploaded Files
export const getUploadedFiles = async (token) => {
  try {
    const response = await axios.get(`${Upload_URL}/uploads/files`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching files:', error.response?.data?.message);
    throw error;
  }
};
