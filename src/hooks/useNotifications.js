import { useEffect, useState } from "react";
import { getSAOCombinedNotifications, markNotificationAsRead } from "../api/saoAPI";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getSAOCombinedNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (schoolId, category, notificationId) => {
    try {
      await markNotificationAsRead(schoolId, category, notificationId);
      setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId));
    } catch (error) {
      console.error("❌ Failed to mark notification as read:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return { notifications, loading, refresh: fetchNotifications, markAsRead };
};

export default useNotifications;
