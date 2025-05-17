import { useEffect, useState } from "react";
import axios from "axios";

export const useChatbotPolling = (schoolId) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let interval;
    const token = localStorage.getItem("saoToken");
    let attempts = 0;

    const pollStatus = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/sao/chatbot/ready`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.ready && !localStorage.getItem("chatbotReadyShown")) {
          setShowPopup(true);
          localStorage.setItem("chatbotReadyShown", "true");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error polling chatbot status", err);
      }

      attempts++;
      if (attempts >= 12) {
        clearInterval(interval); 
      }
    };

    interval = setInterval(pollStatus, 5000);

    return () => clearInterval(interval);
  }, [schoolId]);

  return { showPopup, setShowPopup };
};
