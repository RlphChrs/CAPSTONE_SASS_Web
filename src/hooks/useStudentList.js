import { useState, useEffect } from "react";
import { getStudentList } from "../api/saoAPI";

export const useStudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getStudentList();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { students, loading };
};