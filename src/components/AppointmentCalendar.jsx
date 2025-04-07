import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import useAppointments from "../hooks/useAppointments";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"; 

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getDaysInMonth = (month, year) => {
  const monthIndex = months.indexOf(month);
  return new Date(year, monthIndex + 1, 0).getDate();
};



const getFirstDayOfMonth = (month, year) => {
  const monthIndex = months.indexOf(month);
  return new Date(year, monthIndex, 1).getDay();
};

const AppointmentCalendar = ({ onDayClick }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(months[today.getMonth()]);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromTime, setFromTime] = useState("06:00");
  const [toTime, setToTime] = useState("07:00");
  const [studentName, setStudentName] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);

  const { appointments, fetchAppointments } = useAppointments();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("saoUser"));
  const token = localStorage.getItem("saoToken");

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const firstDayIndex = firstDay === 0 ? 6 : firstDay - 1;

  const handleDayClick = async (day) => {
    const formattedDate = `${currentYear}-${String(months.indexOf(currentMonth) + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  
    if (!user || !token || (!user.schoolId && !user.schoolName)) {
      console.warn("⚠️ No valid SAO user or token. Cannot fetch appointments.");
      onDayClick?.(formattedDate, []);
      return;
    }
  
    const school = user.schoolId || user.schoolName;
    const fetchedAppointments = await fetchAppointments(school, formattedDate, token);
  
    console.log("📌 Got appointments for", formattedDate, "=>", fetchedAppointments);
    onDayClick?.(formattedDate, fetchedAppointments); 
  };
  
  const addAppointment = async () => {
    if (!studentName.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const formattedDate = selectedDate
      ? new Date(selectedDate).toISOString().split("T")[0]
      : null;
  
    if (!formattedDate) {
      alert("Invalid or missing date.");
      return;
    }
  
    // ✅ Duration check
    const from = new Date(`1970-01-01T${fromTime}`);
    const to = new Date(`1970-01-01T${toTime}`);
    const duration = (to - from) / (1000 * 60 * 60);
  
    if (duration !== 1) {
      alert("Appointment should only be 1 hour long.");
      return;
    }
  
    // ✅ Conflict check for already booked time slots
    const hasConflict = appointments.some(appt => {
      if (appt.date !== formattedDate) return false;
  
      const apptFrom = new Date(`1970-01-01T${appt.fromTime}`);
      const apptTo = new Date(`1970-01-01T${appt.toTime}`);
  
      return from < apptTo && to > apptFrom;
    });
  
    if (hasConflict) {
      alert("That time slot is already booked. Please choose a different time.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/student/appointments/sao/book",
        {
          studentName,
          date: formattedDate,
          fromTime,
          toTime,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("Appointment added successfully.");
      console.log("✅ Appointment added:", response.data.message);
  
      setEvents((prev) => [
        ...prev,
        {
          date: formattedDate,
          name: description,
          time: fromTime,
          color: "bg-yellow-500",
          studentName: studentName || "Walk-in",
        }
      ]);
  
      setStudentName("");
      setDescription("");
      setFromTime("06:00");
      setToTime("07:00");
      setSelectedDate(null);
      setIsModalOpen(false);
  
    } catch (err) {
      if (err.response?.status === 409) {
        alert("That time slot is already booked. Please choose a different time.");
      } else {
        console.error("❌ Error adding appointment:", err.response?.data || err.message);
        alert("Failed to add appointment. Please check the date/time or try again.");
      }
    }
  
  };

  return (
    <div className="p-6 text-black mt-15 rounded-lg">
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
          <span className="text-lg font-bold text-black">
            {currentMonth} {currentYear}
          </span>
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="border border-blue-500 text-blue-500 px-2 py-1 rounded-lg"
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <input
            type="number"
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            className="border border-blue-500 text-blue-500 px-2 py-1 rounded-lg w-20"
          />
        </div>
        <div className="flex items-center gap-3">
          <FaSearch className="text-gray-600 cursor-pointer" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mt-5 gap-1 border rounded-lg overflow-hidden bg-white h-160">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold p-2 bg-gray-200 text-black">
            {day}
          </div>
        ))}

        {[...Array(firstDayIndex)].map((_, i) => (
          <div key={`empty-${i}`} className="border p-3 min-h-[80px]" />
        ))}

        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const fullDate = `${currentYear}-${String(months.indexOf(currentMonth) + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const filteredAppointments = Array.isArray(appointments)
            ? appointments.filter((appt) => appt.date === fullDate)
            : [];

          return (
            <div
              key={day}
              className="border p-3 min-h-[80px] relative cursor-pointer hover:bg-gray-100"
              onClick={() => handleDayClick(day)}
            >
              <span className="text-sm">{day}</span>
              {filteredAppointments.map((appt, idx) => (
                <div key={idx} className="text-xs text-blue-500 mt-1">
                  {appt.studentName} - {appt.fromTime}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[700px] max-w-[90%] grid grid-cols-2 gap-8">
      
      {/* Left Column - Date Picker */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Choose Date</h2>
        <DatePicker
          selected={selectedDate ? new Date(selectedDate) : new Date()}
          onChange={(date) => setSelectedDate(date)}
          className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          dateFormat="MM/dd/yyyy"
        />
      </div>

      {/* Right Column - Time and Info */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">⏰ Choose Time</h2>

        <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
        <input
          type="time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
        <input
          type="time"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-gray-600 mb-1">Student Full Name</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="e.g. Juan Dela Cruz"
          className="w-full border border-gray-300 p-3 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter appointment details..."
          className="w-full border border-gray-300 p-3 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-xs text-gray-500 mb-4">
          {selectedDate ? new Date(selectedDate).toLocaleDateString() : ""} — {fromTime} to {toTime}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={addAppointment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AppointmentCalendar;
