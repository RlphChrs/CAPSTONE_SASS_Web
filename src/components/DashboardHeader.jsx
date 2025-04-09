import axios from 'axios';
import React, { useState } from "react";
import { FaBell, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ApplicationLogo from '../assets/logo.png';
import useNotifications from '../hooks/useNotifications';
import { respondToReport, fetchReportById } from "../api/saoAPI";
 

const DashboardHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const { notifications, loading, error, markAsRead } = useNotifications();
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseSubject, setResponseSubject] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportViewModalOpen, setIsReportViewModalOpen] = useState(false);


  const getPageName = (path) => {
    const formattedPath = path.split('/')[1];
    return formattedPath
      ? formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1).replace('-', ' ')
      : 'Dashboard';
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token"); 
    sessionStorage.clear(); 
    navigate('/login');
  };

  const handleSubscriptionClick = () => {
    navigate('/subscription'); 
  };

  const handleViewPDF = (notification) => {
    console.log("📄 Opening PDF:", notification.fileUrl); 
    setSelectedPDF(notification.fileUrl); 
    setIsModalOpen(true);
  };
  const formatDate = (timestamp) => {
    if (!timestamp?._seconds) return "";
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString("en-US");
  };
  
  const formatTime = (timestamp) => {
    if (!timestamp?._seconds) return "";
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };
  
  

  return (
    <>
      <nav className="bg-[#0B0D21] text-white flex items-center justify-between px-6 py-3 fixed top-0 left-0 right-0 shadow-md z-50">
        <div className="flex items-center space-x-4">
          <img src={ApplicationLogo} alt="SASS Logo" className="w-16 h-10 rounded-lg" />
          <div className="text-gray-400 text-sm ml-50.5">
            Pages / <span className="text-white">{getPageName(location.pathname)}</span>
          </div>
        </div>
  
        <div className="flex items-center space-x-6">
          {/* Subscribe Button */}
          <button
            onClick={handleSubscriptionClick}
            className="bg-gradient-to-r from-indigo-600 to-indigo-600 px-4 py-2 rounded-md font-medium"
          >
            Subscribe
          </button>
  
          <input
            type="text"
            placeholder="Type..."
            className="bg-white text-black px-3 py-1 rounded-md focus:outline-none"
          />
  
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsSettingsOpen(false);
              }}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span className="text-sm">J. Smith</span>
              <img src="../image/picture.png" alt="Profile" className="h-8 w-8 rounded-full" />
            </button>
  
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center px-4 py-2 hover:bg-gray-200 w-full text-left"
                >
                  <FaUser className="mr-2" /> Profile
                </button>
              </div>
            )}
          </div>
          
                           {/* 🔔 Notification Dropdown */}
<div className="relative">
  <button
    className="text-gray-400 hover:text-white relative"
    onClick={() => setShowNotifications(!showNotifications)}
  >
    <FaBell size={18} />
    {notifications.length > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
        {notifications.length}
      </span>
    )}
  </button>

  {showNotifications && (
    <div className="absolute right-0 mt-2 w-[420px] bg-white text-black rounded-md shadow-lg max-h-[400px] overflow-y-auto z-50">
      <h3 className="font-semibold px-4 py-2 border-b">Notifications</h3>

      {loading ? (
        <p className="px-4 py-2">Loading...</p>
      ) : error ? (
        <p className="px-4 py-2 text-red-500">Error loading notifications</p>
      ) : notifications.length === 0 ? (
        <p className="px-4 py-2">No new notifications</p>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex justify-between items-start rounded-md px-4 py-2 mb-2 mx-2 ${
              notif.type === "appointment"
                ? "bg-blue-200"
                : notif.type === "report"
                ? "bg-yellow-100"
                : "bg-gray-200"
            }`}
            onClick={() => {
              if (notif.type === "appointment") {
                markAsRead(notif.schoolId, "appointmentBookings", notif.id);
              }
            }}
          >
            <div className="flex-1">
              {notif.type === "appointment" ? (
                <>
                  <p className="font-bold text-sm mb-1">
                    {notif.studentName?.toUpperCase()} booked an appointment
                  </p>
                  <p className="text-sm text-gray-700">
                    {notif.date} from {notif.fromTime} to {notif.toTime}
                  </p>
                </>
              ) : notif.type === "report" ? (
                <>
                  <p className="font-bold text-sm mb-1">
                    {notif.studentName?.toUpperCase()} submitted a report
                  </p>
                  <p className="text-sm text-gray-700 truncate">
                    Reason: {notif.reason}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold text-sm mb-1">
                    {notif.studentName?.toUpperCase()} Submitted a file
                  </p>
                  <p className="text-sm text-gray-700 truncate">{notif.reason}</p>
                </>
              )}
            </div>

            <div className="text-right text-sm text-gray-600 whitespace-nowrap px-4">
              <p>{formatDate(notif.timestamp)}</p>
              <p>{formatTime(notif.timestamp)}</p>
            </div>

            {/* Actions */}
            {notif.type === "report" ? (
              <div className="flex flex-col space-y-1 ml-4">
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      const report = await fetchReportById(notif.reportId); 
                      setSelectedReport({
                        ...notif,
                        ...report,
                        reportId: notif.reportId
                      });
                      setIsReportViewModalOpen(true);
                    } catch (err) {
                      console.error("Error fetching report:", err);
                    }
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-4 py-1 rounded"
                >
                  View
                </button>
              </div>
            ) : notif.type !== "appointment" && (
              <div className="flex flex-col space-y-1 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPDF(notif.fileUrl);
                    setIsModalOpen(true);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-4 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStudent({
                      name: notif.studentName,
                      id: notif.studentId,
                      notifId: notif.id,
                      schoolId: notif.schoolId
                    });
                    setIsResponseModalOpen(true);
                  }}
                  className="bg-[#0B0D21] hover:bg-gray-900 text-white text-xs px-4 py-1 rounded"
                >
                  Respond
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )}

  {/* ✅ Modal to view full report */}
  {isReportViewModalOpen && selectedReport && (
    <div className="fixed inset-0 bg-opacity-40 text-black flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white border-2 border-black p-6 rounded-lg w-[500px] shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📄 Report Details</h3>

        <div className="space-y-2 text-sm">
          <p><strong>Student:</strong> {selectedReport.studentName || "N/A"}</p>
          <p><strong>Name of Person:</strong> {selectedReport.nameOfPerson || "N/A"}</p>
          <p><strong>ID Number:</strong> {selectedReport.idNumberOfPerson || "N/A"}</p>
          <p><strong>Reason:</strong> {selectedReport.reason || "N/A"}</p>

          <div>
            <p className="font-semibold mb-1">📝 Description:</p>
            <div className="border border-gray-400 p-3 rounded max-h-60 overflow-y-auto text-sm text-black whitespace-pre-line">
              {selectedReport.description?.trim()
                ? selectedReport.description
                : "No description provided."}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setSelectedStudent({
                name: selectedReport.studentName,
                id: selectedReport.studentId,
                notifId: selectedReport.id,
                schoolId: selectedReport.schoolId,
                reportId: selectedReport.reportId,
              });
              setIsResponseModalOpen(true);
              setIsReportViewModalOpen(false);
            }}
            className="bg-[#0B0D21] text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Respond
          </button>

          <button
            onClick={() => setIsReportViewModalOpen(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</div>




          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsSettingsOpen(!isSettingsOpen);
                setIsProfileOpen(false);
              }}
              className="text-gray-400 hover:text-white"
            >
              <FaCog size={18} />
            </button>
  
            {isSettingsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 hover:bg-gray-200 w-full text-left"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
  
      {/* 📄 PDF Modal */}
      {selectedPDF && isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-[90%] h-[90%] rounded-md overflow-hidden relative">
          <button
            onClick={() => {
              setSelectedPDF(null);
              setIsModalOpen(false);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm z-10"
          >
            Close
          </button>     
          <iframe
            src={selectedPDF}
            className="w-full h-full"
            title="PDF Viewer"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
      )}

{isResponseModalOpen && selectedStudent && (
  <div className="fixed inset-0 bg-opacity-50 text-black flex justify-center items-center z-50 backdrop-blur-xs">
    <div className="bg-white w-[90%] max-w-2xl rounded-lg shadow-lg p-6 relative">
      <h2 className="text-lg font-semibold text-[#0B0D21] mb-4">
        Send to {selectedStudent.name || 'Student'}
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Recipients"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={selectedStudent.name}
          readOnly
        />

        <input
          type="text"
          placeholder="Subject"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={responseSubject}
          onChange={(e) => setResponseSubject(e.target.value)}
        />

        <textarea
          placeholder="Your message..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-40"
          value={responseMessage}
          onChange={(e) => setResponseMessage(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            setIsResponseModalOpen(false);
            setResponseSubject("");
            setResponseMessage("");
          }}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            if (!responseSubject.trim() || !responseMessage.trim()) {
              alert("Please fill in both the subject and message.");
              return;
            }

            try {
              const token = localStorage.getItem("token");
              const payload = {
                studentId: selectedStudent.id,
                studentName: selectedStudent.name,
                subject: responseSubject,
                message: responseMessage,
              };

              // 🧠 Dynamically pick correct endpoint + mark as read logic
              if (selectedStudent.reportId) {
                payload.reportId = selectedStudent.reportId;
                const res = await axios.post(
                  `${import.meta.env.VITE_SAO_URL}/respond/respond-report`
,
                  payload,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                await markAsRead(
                  selectedStudent.schoolId,
                  "report",
                  selectedStudent.notifId
                );
              } else {
                const res = await axios.post(
                  `${import.meta.env.VITE_SAO_URL}/notifications/respond`,
                  payload,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                await markAsRead(
                  selectedStudent.schoolId,
                  "studentSubmissions",
                  selectedStudent.notifId
                );
              }

              alert("Response sent successfully!");
              setIsResponseModalOpen(false);
              setResponseSubject("");
              setResponseMessage("");
            } catch (err) {
              console.error("❌ Failed to send response:", err);
              alert("Something went wrong while sending the response.");
            }
          }}
          className="bg-[#0B0D21] text-white px-6 py-2 rounded hover:bg-gray-900"
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
}

export default DashboardHeader;
