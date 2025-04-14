import { useCallback, useEffect, useState } from "react";
import { getSAOSubmissions, markSubmissionAsViewed } from "../api/saoAPI";

const useLetterSubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      console.log("📡 Fetching SAO submissions...");
      const token = localStorage.getItem("token");
      const data = await getSAOSubmissions(token);
      console.log("📥 Fetched submissions:", data);
      setSubmissions(data);
      setError(null);
    } catch (err) {
      console.error("📛 Failed to fetch submissions:", err);
      setError("Failed to fetch submissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const markAsViewed = async (submissionId) => {
    try {
      console.log("🟡 Attempting to mark as viewed:", submissionId);
      await markSubmissionAsViewed(submissionId);
      console.log("✅ Marked in backend. Updating local state...");
      setSubmissions((prev) => {
        const updated = prev.map((entry) => {
          if (entry.id === submissionId) {
            console.log("🔁 Matched entry ID. Updating:", entry);
            return { ...entry, status: "viewed" };
          }
          return entry;
        });
        console.log("🧾 Updated submissions array:", updated);
        return updated;
      });
    } catch (err) {
      console.error("📛 Failed to mark as viewed:", err);
    }
  };

  return {
    submissions,
    loading,
    error,
    fetchSubmissions,
    markAsViewed,
    setSubmissions,
  };
};

export default useLetterSubmission;
