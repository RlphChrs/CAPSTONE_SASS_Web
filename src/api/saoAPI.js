import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Registration
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
      return response.data; // ✅ Returns { message, token }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message);
      throw error;
    }
  };
