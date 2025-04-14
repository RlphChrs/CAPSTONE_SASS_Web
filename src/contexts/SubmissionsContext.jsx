// src/contexts/SubmissionsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getSAOSubmissions, markSubmissionAsViewed } from "../api/saoAPI";

const SubmissionsContext = createContext();

export const SubmissionsProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getSAOSubmissions(token);
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const markAsViewed = async (id) => {
    try {
      await markSubmissionAsViewed(id);
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "viewed" } : s))
      );
    } catch (error) {
      console.error("Error marking as viewed:", error);
    }
  };

  return (
    <SubmissionsContext.Provider
      value={{ submissions, markAsViewed, refreshSubmissions: fetchSubmissions }}
    >
      {children}
    </SubmissionsContext.Provider>
  );
};

export const useSubmissions = () => useContext(SubmissionsContext);
