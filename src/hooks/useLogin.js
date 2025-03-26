import { useState } from 'react';
import { loginSAO } from '../api/saoAPI.js';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginSAO(email, password);
      localStorage.setItem("token", response.token); // ✅ SAVE it!
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
      setLoading(false);
      throw err;
    }
  };

  return { login, loading, error };
};