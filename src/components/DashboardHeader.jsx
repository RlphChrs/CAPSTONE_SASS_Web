import React, { useState, useEffect } from "react";
import { FaBell, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ApplicationLogo from "../assets/logo.png";
import useNotifications from "../hooks/useNotifications";
import { fetchReportById } from "../api/saoAPI";
import ReportDetailsModal from "./modals/ReportDetailsModal";
import PdfViewerModal from "./modals/PdfViewerModal";
import ResponseModal from "./modals/ResponseModal";
import { useSubmissions } from "../contexts/SubmissionsContext";

const DashboardHeader = ({ onSubmissionViewed }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseSubject, setResponseSubject] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportViewModalOpen, setIsReportViewModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { notifications, loading, error, markAsRead } = useNotifications();
  const { markAsViewed } = useSubmissions();

  useEffect(() => {
    console.log("🔔 Raw notifications fetched:", notifications);
  }, [notifications]);

  const getPageName = (path) => {
    const formattedPath = path.split("/")[1];
    return formattedPath
      ? formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1).replace("-", " ")
      : "Dashboard";
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

  const handleProfileClick = () => navigate("/profile");
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };
  const handleSubscriptionClick = () => navigate("/subscription");

  const filteredNotifications = notifications.filter((n) => {
    const isFiltered =
      (n.type === "submission" || n.type === "report") &&
      n.status?.toLowerCase() === "responded";

    if (n.type === "appointment") {
      console.log("📅 Appointment Notification (will render):", n);
    }

    if (isFiltered) {
      console.log("🚫 Filtered out notification (responded):", n);
    }

    return !isFiltered;
  });

  useEffect(() => {
    console.log("📦 Filtered notifications to render:", filteredNotifications);
  }, [filteredNotifications]);

  return (
    <>
      <nav className="bg-[#0B0D21] text-white flex items-center justify-between px-6 py-3 fixed top-0 left-0 right-0 shadow-md z-50">
        <div className="flex items-center space-x-4">
          <img src={ApplicationLogo} alt="SASS Logo" className="w-16 h-10 rounded-lg" />
          <div className="text-gray-400 text-sm">
            Pages / <span className="text-white">{getPageName(location.pathname)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button onClick={handleSubscriptionClick} className="bg-gradient-to-r from-indigo-600 to-indigo-600 px-4 py-2 rounded-md font-medium">
            Subscribe
          </button>

          <input type="text" placeholder="Type..." className="bg-white text-black px-3 py-1 rounded-md focus:outline-none" />

          {/* Profile */}
          <div className="relative">
            <button onClick={() => { setIsProfileOpen(!isProfileOpen); setIsSettingsOpen(false); }} className="flex items-center space-x-2">
              <span className="text-sm">J. Smith</span>
              <img src="../image/picture.png" alt="Profile" className="h-8 w-8 rounded-full" />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
                <button onClick={handleProfileClick} className="flex items-center px-4 py-2 hover:bg-gray-200 w-full text-left">
                  <FaUser className="mr-2" /> Profile
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="text-gray-400 hover:text-white relative" onClick={() => setShowNotifications(!showNotifications)}>
              <FaBell size={18} />
              {filteredNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {filteredNotifications.length}
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
                ) : filteredNotifications.length === 0 ? (
                  <p className="px-4 py-2">No new notifications</p>
                ) : (
                  filteredNotifications.map((notif) => {
                    console.log(`🔔 Rendering ${notif.type} notification:`, notif);
                    return (
                      <div
                        key={notif.id}
                        className={`flex justify-between items-start rounded-md px-4 py-2 mb-2 mx-2 ${
                          notif.type === "appointment"
                            ? "bg-blue-200"
                            : notif.type === "report"
                            ? "bg-yellow-100"
                            : "bg-gray-200"
                        }`}
                        onClick={(e) => {
                          if (e.target.tagName !== "BUTTON" && notif.type === "appointment") {
                            console.log("📥 Marking appointment as read:", notif.id);
                            markAsRead(notif.schoolId, "appointmentBookings", notif.id);
                          }
                        }}
                      >
                        <div className="flex-1">
                          <p className="font-bold text-sm mb-1">
                            {notif.studentName?.toUpperCase()}{" "}
                            {notif.type === "report"
                              ? "submitted a report"
                              : notif.type === "appointment"
                              ? "booked an appointment"
                              : "submitted a file"}
                          </p>
                          <p className="text-sm text-gray-700 truncate">
                            {notif.reason || `${notif.date} from ${notif.fromTime} to ${notif.toTime}`}
                          </p>
                        </div>

                        <div className="text-right text-sm text-gray-600 whitespace-nowrap px-4">
                          <p>{formatDate(notif.timestamp)}</p>
                          <p>{formatTime(notif.timestamp)}</p>
                        </div>

                        <div className="flex flex-col space-y-1 ml-4">
                          {notif.type === "report" ? (
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                const report = await fetchReportById(notif.reportId);
                                setSelectedReport({ ...notif, ...report, reportId: notif.reportId });
                                setIsReportViewModalOpen(true);
                              }}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-4 py-1 rounded"
                            >
                              View
                            </button>
                          ) : notif.type === "submission" ? (
                            <>
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (notif.submissionId) {
                                    await markAsViewed(notif.submissionId);
                                    onSubmissionViewed?.(notif.submissionId);
                                  }
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
                                    schoolId: notif.schoolId,
                                    submissionId: notif.submissionId,
                                  });
                                  setIsResponseModalOpen(true);
                                }}
                                className="bg-[#0B0D21] hover:bg-gray-900 text-white text-xs px-4 py-1 rounded"
                              >
                                Respond
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative">
            <button onClick={() => { setIsSettingsOpen(!isSettingsOpen); setIsProfileOpen(false); }} className="text-gray-400 hover:text-white">
              <FaCog size={18} />
            </button>
            {isSettingsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
                <button onClick={handleLogout} className="flex items-center px-4 py-2 hover:bg-gray-200 w-full text-left">
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modals */}
      {selectedPDF && isModalOpen && (
        <PdfViewerModal selectedPDF={selectedPDF} setSelectedPDF={setSelectedPDF} setIsModalOpen={setIsModalOpen} />
      )}

      {isResponseModalOpen && selectedStudent && (
        <ResponseModal
          student={selectedStudent}
          onClose={() => setIsResponseModalOpen(false)}
          subject={responseSubject}
          setSubject={setResponseSubject}
          message={responseMessage}
          setMessage={setResponseMessage}
          markAsRead={markAsRead}
        />
      )}

      {isReportViewModalOpen && selectedReport && (
        <ReportDetailsModal
          selectedReport={selectedReport}
          setSelectedStudent={setSelectedStudent}
          setIsResponseModalOpen={setIsResponseModalOpen}
          setIsReportViewModalOpen={setIsReportViewModalOpen}
        />
      )}
    </>
  );
};

export default DashboardHeader;
