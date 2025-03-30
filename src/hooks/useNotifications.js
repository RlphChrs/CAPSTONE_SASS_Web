import { useEffect, useState } from "react";
import { getSAONotifications } from "../api/saoAPI";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getSAONotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(); // auto-fetch when hook is used
  }, []);

  return { notifications, loading, refresh: fetchNotifications };
};

export default useNotifications;
