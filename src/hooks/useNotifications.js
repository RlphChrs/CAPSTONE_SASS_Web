import { useEffect, useState } from "react";
import {
  getSAOCombinedNotifications,
  markNotificationAsRead,
} from "../api/saoAPI";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getSAOCombinedNotifications();
      console.log("📬 Combined notifications fetched:", data); // 🔍 Add this
      setNotifications(data);
    } catch (err) {
      console.error("❌ Failed to fetch notifications:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const markAsRead = async (schoolId, category, notificationId) => {
    try {
      await markNotificationAsRead(schoolId, category, notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (err) {
      console.error("❌ Failed to mark notification as read:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return { notifications, loading, error, refresh: fetchNotifications, markAsRead };
};

export default useNotifications;
