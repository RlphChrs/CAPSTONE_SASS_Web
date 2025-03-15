import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import { FaSearch } from "react-icons/fa";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const ampm = i < 12 ? "AM" : "PM";
  return `${hour}:00 ${ampm}`;
});

const AddAppointment = () => {
  const [currentMonth, setCurrentMonth] = useState("January");
  const [currentYear, setCurrentYear] = useState(2025);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromTime, setFromTime] = useState("06:00");
  const [toTime, setToTime] = useState("07:00");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([
    { date: "2025-01-02", name: "Meeting", time: "06:00 AM", color: "bg-red-500" },
    { date: "2025-01-02", name: "Web Team Update", time: "11:00 AM", color: "bg-green-500" },
    { date: "2025-01-03", name: "Workshop", time: "12:00 PM", color: "bg-blue-500" },
  ]);

  // Function to add a new appointment
  const addAppointment = () => {
    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    const newEvent = {
      date: selectedDate.toISOString().split("T")[0],
      name: description,
      time: fromTime,
      color: "bg-yellow-500",
    };

    setEvents([...events, newEvent]);
    setIsModalOpen(false);
    setDescription("");
    setSelectedDate(new Date());
    setFromTime("06:00");
    setToTime("07:00");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        <DashboardHeader />

        {/* Calendar Section */}
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

          {/* Calendar Day View */}
          <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-1 divide-y">
              {hours.map((hour) => (
                <div key={hour} className="relative flex items-center h-16 px-4">
                  <span className="text-gray-500 w-16">{hour}</span>
                  {events.map((event) =>
                    event.time === hour ? (
                      <div
                        key={event.name}
                        className={`absolute left-20 w-5/6 p-2 text-sm text-black ${event.color} rounded-md shadow-md`}
                      >
                        {event.name}
                      </div>
                    ) : null
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding Appointment */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-md flex items-center text-left justify-center text-black">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] grid grid-cols-2 gap-6">
            {/* Choose Date Picker */}
            <div>
              <h2 className="text-lg font-bold mb-4">Choose Date</h2>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full border p-2 rounded-lg"
                dateFormat="MM/dd/yyyy"
              />
            </div>

            {/* Choose Time Picker, Description, and Buttons */}
            <div>
              <h2 className="text-lg font-bold mb-4">Choose Time</h2>
              <label className="block text-sm font-medium mt-2">From</label>
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />
              <label className="block text-sm font-medium mt-2">To</label>
              <input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="w-full border p-2 rounded-lg"
              />
              <label className="block text-sm font-medium mt-2">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter appointment details..."
                className="w-full border p-2 rounded-lg"
              />
              <div className="w-full border p-2 rounded-lg mt-2">
                {selectedDate.toLocaleDateString()} {fromTime} - {toTime}
              </div>
              <div className="w-full flex justify-between items-center mt-4">
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

export default AddAppointment;
