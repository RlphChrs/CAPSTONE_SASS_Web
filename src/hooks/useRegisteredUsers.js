import { useEffect, useState } from 'react';
import axios from 'axios';

const useRegisteredUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('saoToken');
        const res = await axios.get(`${import.meta.env.VITE_SAO_URL}/stats/registered-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const stats = res.data;
        console.log('📥 Raw stats from backend:', stats);

        const formatted = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
          day,
          users: stats[day] || 0,
        }));

        console.log('📊 Formatted chart data:', formatted);
        setData(formatted);
      } catch (error) {
        console.error('❌ Failed to fetch registered user stats:', error);
      }
    };

    fetchStats();
  }, []);

  return data;
};

export default useRegisteredUsers;
