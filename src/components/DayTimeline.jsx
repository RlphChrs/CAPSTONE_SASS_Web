import React from "react";

const hours = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const colors = [
  "bg-rose-50",
  "bg-green-50",
  "bg-blue-50",
  "bg-yellow-50",
  "bg-purple-50"
];

// Convert "9:00 AM" → "09:00"
const to24Hour = (timeStr) => {
  const [time, meridian] = timeStr.split(" ");
  let [hour] = time.split(":");
  hour = parseInt(hour);
  if (meridian === "PM" && hour !== 12) hour += 12;
  if (meridian === "AM" && hour === 12) hour = 0;
  return hour.toString().padStart(2, "0") + ":00";
};

const DayTimeline = ({ date, appointments = [], onDelete, onBack }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-15 max-w-[90%] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Appointments for {new Date(date).toLocaleDateString()}
        </h3>
        <button
          onClick={onBack}
          className="bg-darkBlue-900 text-sm text-gray-700 px-4 py-1 rounded hover:bg-gray-300 shadow"
        >
          ← Back to Calendar
        </button>
      </div>

      <div className="border-t border-gray-300 divide-y divide-gray-200">
        {hours.map((hour) => {
          const formattedHour = to24Hour(hour);
          const slotAppointments = appointments.filter(appt =>
            appt.fromTime?.startsWith(formattedHour)
          );

          return (
            <div key={hour} className="relative min-h-[80px] flex items-center px-3 py-2">
              <span className="text-gray-500 w-24 text-sm absolute left-2">{hour}</span>

              {slotAppointments.length > 0 ? (
                <div className="ml-28 w-full flex flex-col gap-3">
                  {slotAppointments.map((appt, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center px-4 py-3 rounded-xl shadow-md border border-gray-200 text-sm text-gray-800 ${colors[i % colors.length]}`}
                    >
                      <div className="flex flex-wrap items-center gap-6">
                        <span className="font-semibold text-sm flex items-center gap-1">
                          👤 {appt.studentName}
                        </span>
                        <span className="italic text-sm text-gray-700 flex items-center gap-1">
                          📌 {appt.description}
                        </span>
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          🕒 {appt.fromTime} – {appt.toTime}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          🗓️ Booked on{" "}
                          {appt.timestamp?._seconds
                            ? new Date(appt.timestamp._seconds * 1000).toLocaleDateString()
                            : "unknown"}
                        </span>
                      </div>

                      <button
                        onClick={() => onDelete?.(appt.id)}
                        className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-medium transition"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ml-28 w-full text-xs text-blue-700 bg-blue-100 px-4 py-2 rounded-md shadow-sm">
                  Available
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayTimeline;
