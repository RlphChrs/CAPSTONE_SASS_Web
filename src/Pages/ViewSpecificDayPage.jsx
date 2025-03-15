import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const ViewSpecificDayPage = () => {
  const [currentMonth, setCurrentMonth] = useState("January");
  const [currentYear, setCurrentYear] = useState(2025);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([
    { date: "2025-01-02", name: "Meeting", time: "06:00", color: "bg-red-500" },
    { date: "2025-01-02", name: "Web Team Update", time: "11:00", color: "bg-green-500" },
    { date: "2025-01-03", name: "Workshop", time: "12:00", color: "bg-blue-500" },
  ]);

  const addAppointment = () => {
    if (!selectedDate || !fromTime || !toTime || !description) {
      alert("Please fill all fields");
      return;
    }
    const newEvent = {
      date: selectedDate.toISOString().split("T")[0],
      name: description,
      time: fromTime,
      color: "bg-purple-500",
    };
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
    setSelectedDate(null);
    setFromTime("");
    setToTime("");
    setDescription("");
  };

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 flex flex-col p-6">
        <DashboardHeader />
        <div className="p-6 text-black mt-15 rounded-lg">
          <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-black">{currentMonth} {currentYear}</span>
              <select value={currentMonth} onChange={(e) => setCurrentMonth(e.target.value)} className="border px-2 py-1 rounded-lg">
                {months.map((month) => (<option key={month} value={month}>{month}</option>))}
              </select>
              <input type="number" value={currentYear} onChange={(e) => setCurrentYear(parseInt(e.target.value))} className="border px-2 py-1 rounded-lg w-20" />
            </div>
            <div className="flex items-center gap-3">
              <FaSearch className="text-gray-600 cursor-pointer" />
              <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Appointment</button>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-1 divide-y">
              {hours.map((hour) => (
                <div key={hour} className="relative flex items-center h-16 px-4">
                  <span className="text-gray-500 w-16">{hour}</span>
                  {events.map((event) => event.time === hour && (
                    <div key={event.name} className={`absolute left-20 w-5/6 p-2 text-sm text-black ${event.color} rounded-md shadow-md`}>
                      {event.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-md flex items-center justify-center text-black text-left">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] flex gap-6">
            {/* Choose Date Picker */}
            <div className="w-1/2">
              <h2 className="text-lg font-bold mb-4">Choose Date</h2>
              <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="w-full border p-2 rounded-lg" dateFormat="MM/dd/yyyy" />
            </div>

            {/* Choose Time, Description, and Buttons */}
            <div className="w-1/2 flex flex-col gap-3">
              <h3 className="text-md font-semibold">Choose Time</h3>
              <label className="block text-sm font-medium">From</label>
              <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} className="w-full border p-2 rounded-lg" />
              <label className="block text-sm font-medium">To</label>
              <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} className="w-full border p-2 rounded-lg" />
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded-lg" placeholder="Description" />
              <div className="w-full border p-2 rounded-lg">
                {selectedDate ? selectedDate.toLocaleDateString() : "N/A"} {fromTime} - {toTime}
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                <button onClick={addAppointment} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSpecificDayPage;
