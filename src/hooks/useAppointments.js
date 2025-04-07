import { useState } from 'react';
import axios from 'axios';

const APPOINTMENTS_URL = import.meta.env.VITE_APPOINTMENTS_URL;

const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async (schoolId, date, token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APPOINTMENTS_URL}/${schoolId}/${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.bookings || [];
      setAppointments(data);
      console.log("📦 Got response from backend:", data);
      return data; 
    } catch (error) {
      console.error("❌ Failed to fetch appointments:", error);
      setAppointments([]);
      return [];
    }
  };  
  return { appointments, fetchAppointments };
};

export default useAppointments;
