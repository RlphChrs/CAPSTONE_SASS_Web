import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import { FaSearch } from "react-icons/fa";

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

const CalendarMonthView = () => {
  const [currentMonth, setCurrentMonth] = useState("January");
  const [currentYear, setCurrentYear] = useState(2025);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [description, setDescription] = useState("");

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const firstDayIndex = firstDay === 0 ? 6 : firstDay - 1;

  const events = [
    { date: "2025-01-02", name: "Event", time: "06:00", color: "text-red-500" },
    { date: "2025-01-02", name: "Web Team Progress Update", time: "11:00", color: "text-green-500" },
    { date: "2025-01-03", name: "Event", time: "12:00", color: "text-blue-500" },
  ];

  const handleDayClick = (day) => {
    const formattedDate = `${currentYear}-${String(months.indexOf(currentMonth) + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    navigate(`/view-specific-day`);
  };
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const addAppointment = () => {
    console.log("Appointment added:", { selectedDate, fromTime, toTime, description });
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 flex flex-col p-6">
        <DashboardHeader />
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
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Edit Appointment
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
              <div key={`empty-${i}`} className="border p-3 min-h-[80px]"></div>
            ))}
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const fullDate = `${currentYear}-${String(months.indexOf(currentMonth) + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              return (
                <div
                  key={day}
                  className="border p-3 min-h-[80px] relative cursor-pointer hover:bg-gray-100"
                  onClick={() => handleDayClick(day)}
                >
                  <span className="text-sm">{day}</span>
                  {events
                    .filter((event) => event.date === fullDate)
                    .map((event, idx) => (
                      <div key={idx} className={`text-xs ${event.color} mt-1`}>
                        {event.name} - {event.time}
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-80 bg-white p-4 shadow-lg rounded-lg text-black mt-20">
        <h2 className="text-lg font-bold">{currentMonth} {currentYear}</h2>

        {/* Mini Calendar */}
        <div className="grid grid-cols-7 text-center mt-2">
          {daysOfWeek.map((day) => (
            <span key={day} className="font-semibold">{day}</span>
          ))}
          {[...Array(31)].map((_, index) => {
            const day = index + 1;
            return (
              <span key={day} className="py-1">{day}</span>
            );
          })}
        </div>

        {/* Events List */}
        <h3 className="font-semibold mt-4">📅 Today</h3>
        {events.filter(event => event.date === "2025-01-02").map((event, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className={`text-sm ${event.color}`}>{event.name}</span>
            <span className="text-xs">{event.time}</span>
          </div>
        ))}

        <h3 className="font-semibold mt-4">📅 Tomorrow</h3>
        {events.filter(event => event.date === "2025-01-03").map((event, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className={`text-sm ${event.color}`}>{event.name}</span>
            <span className="text-xs">{event.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarMonthView;
