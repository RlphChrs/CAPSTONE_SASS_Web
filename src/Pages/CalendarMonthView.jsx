// CalendarMonthView.jsx
import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import AppointmentCalendar from "../components/AppointmentCalendar";
import DayTimeline from "../components/DayTimeline";

const CalendarMonthView = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);

  const handleDayClick = (date, fetchedAppointments) => {
    console.log("📅 Day Clicked:", date);
    console.log("📥 Appointments received:", fetchedAppointments);
    setSelectedDate(date);
    setAppointments(fetchedAppointments);
    setShowTimeline(true);
  };
  

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 flex flex-col p-6">
        <DashboardHeader />

        {/* Conditional View Toggle */}
        {showTimeline ? (
    <div className="mt-8">
      <DayTimeline
        date={selectedDate}
        appointments={appointments}
        onClose={() => setShowTimeline(false)}
        onBack={() => setShowTimeline(false)}
      />
    </div>
    ) : (
        <AppointmentCalendar onDayClick={handleDayClick} />
      )}

      </div>
    </div>
  );
};

export default CalendarMonthView;
