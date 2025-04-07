import { useState, useEffect } from 'react';
import { loginSAO } from '../api/saoAPI.js'; // ✅ Use the backend-connected API function

// Hook for SAO Login
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginSAO(email, password);
      if (!response || !response.token) {
        throw new Error("Invalid response from server.");
      }
      localStorage.setItem("token", response.token);
      localStorage.setItem("saoUser", JSON.stringify(response.user));

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

export const useSaoAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem("saoUser");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedUser !== "undefined" && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
      } catch (error) {
        console.error("❌ Failed to parse saoUser:", error.message);
        localStorage.removeItem("saoUser");
      }
    } else {
      console.warn("⚠️ No valid user/token found.");
    }
    setLoading(false); 
  }, []);

  return { user, token, loading };
};
