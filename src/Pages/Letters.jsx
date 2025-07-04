import React, { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSubmissions } from "../contexts/SubmissionsContext";
import ResponseModal from "../components/modals/ResponseModal";
import useLetterSubmission from "../hooks/useLetterSubmission";

const Letters = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const { submissions, loading, error, markAsViewed } = useLetterSubmission();

  // Modal states for response
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseSubject, setResponseSubject] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    console.log("🧾 [Letters] Submissions updated:", submissions);
  }, [submissions]);

  const filtered = submissions.filter((entry) => {
    const text = search.toLowerCase();
    return (
      (entry.studentName || "").toLowerCase().includes(text) ||
      (entry.studentId || "").toLowerCase().includes(text) ||
      (entry.date || "").toLowerCase().includes(text) ||
      (entry.time || "").toLowerCase().includes(text) ||
      (entry.reason || "").toLowerCase().includes(text) ||
      (entry.status || "").toLowerCase().includes(text)
    );
  });

  const totalPages = Math.ceil(filtered.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filtered.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to page 1
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "responded":
        return "text-green-600";
      case "viewed":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const handleInlineViewClick = (id) => {
    console.log("📎 Inline View Clicked in table for ID:", id);
    markAsViewed(id);
  };

  const handleNotificationUpdate = (id) => {
    console.log("🔔 Received update from DashboardHeader for ID:", id);
    markAsViewed(id);
  };

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1">
        <DashboardHeader onSubmissionViewed={handleNotificationUpdate} />

        {/* Title */}
        <div className="p-4 mb-4 mt-16 text-left ms-5">
          <h2 className="text-5xl font-bold text-white">Files / Letters</h2>
        </div>

        {/* Filters */}
        <div className="p-2 bg-white rounded-lg shadow-md ml-10 mr-5">
          <div className="flex justify-between items-center mb-1 mt-1">
            <div className="flex items-center space-x-2">
              <span className="text-black text-1xl">Show</span>
              <select
                className="p-2 rounded bg-gray-400 text-black"
                value={entriesPerPage}
                onChange={handleEntriesChange}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-black text-1xl">entries</span>
            </div>
            <input
              type="text"
              placeholder="🔍 Search by name, ID, date, time, or status..."
              className="border p-2 rounded text-black mr-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="p-6 bg-white rounded-lg shadow-md mt-6 ml-10 mr-5">
          {loading ? (
            <p>Loading letters...</p>
          ) : error ? (
            <p className="text-red-500">Error loading letters: {error.message}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-black">
                    <th className="p-3">Student ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Reason</th>
                    <th className="p-3">File</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((entry, index) => (
                    <tr key={entry.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-3 text-black">{entry.studentId}</td>
                      <td className="p-3 text-black">{entry.studentName}</td>
                      <td className="p-3 text-black">{entry.date}</td>
                      <td className="p-3 text-black">{entry.time}</td>
                      <td className="p-3 text-black">
                        {entry.reason?.trim() !== "" ? entry.reason : "No reason provided"}
                      </td>
                      <td className="p-3">
                        <a
                          href={entry.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                          onClick={() => handleInlineViewClick(entry.id)}
                        >
                          View
                        </a>
                      </td>
                      <td className={`p-3 font-bold ${getStatusColor(entry.status)}`}>
                        {entry.status?.charAt(0).toUpperCase() + entry.status?.slice(1) || "Pending"}
                      </td>
                      <td className="p-3 flex space-x-3">
                        <FaEdit
                          className="text-blue-500 cursor-pointer"
                          onClick={() => {
                            setSelectedStudent({
                              name: entry.studentName,
                              id: entry.studentId,
                              notifId: entry.id,
                              schoolId: entry.schoolId,
                              submissionId: entry.id,
                            });
                            setIsResponseModalOpen(true);
                          }}
                        />
                        <FaTrash className="text-red-500 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-700 text-black"}`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-black hover:bg-gray-700"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-700 text-black"}`}
          >
            Next
          </button>
        </div>

        {/*  Response Modal */}
        {isResponseModalOpen && selectedStudent && (
          <ResponseModal
            student={selectedStudent}
            onClose={() => setIsResponseModalOpen(false)}
            subject={responseSubject}
            setSubject={setResponseSubject}
            message={responseMessage}
            setMessage={setResponseMessage}
            markAsRead={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default Letters;
