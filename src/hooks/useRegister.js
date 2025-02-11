import { useState } from 'react';
import { registerSAO } from '../api/saoAPI.js';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await registerSAO(formData);
      setSuccess('Registration successful!');
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
      throw err;
    }
  };

  return { register, loading, error, success };
};
