// 📁 src/hooks/useReports.js

import { useEffect, useState } from "react";
import { getSAOReports } from "../api/saoAPI";

const useReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getSAOReports();
        console.log("📥 Raw Reports:", data.reports); 
        setReports(data.reports);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReports();
  }, []);
  

  return { reports, loading, error };
};

export default useReports;
