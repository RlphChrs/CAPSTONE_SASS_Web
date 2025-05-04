import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import { FaEdit, FaTrash } from "react-icons/fa";
import useReports from "../hooks/useReports";
import { format } from "date-fns";
import ReportDetailsModal from "../components/modals/ReportDetailsModal";
import ResponseModal from "../components/modals/ResponseModal";

const Reports = () => {
  const [search, setSearch] = useState("");
  const { reports, loading, error } = useReports();

  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportViewModalOpen, setIsReportViewModalOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseSubject, setResponseSubject] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const filteredReports = reports?.filter((report) =>
    report.studentName.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1">
        <DashboardHeader />

        {/* Reports Title */}
        <div className="p-4 mb-4 mt-16 text-left ms-6">
          <h2 className="text-5xl font-bold text-white">Reports</h2>
        </div>

        {/* Search and Entry Filter */}
        <div className="p-2 bg-white rounded-lg shadow-md ml-10 mr-5">
          <div className="flex justify-between items-center mb-1 mt-1">
            <div className="flex items-center space-x-2">
              <span className="text-black text-1xl">Show</span>
              <select className="p-2 rounded bg-gray-400 text-black">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span className="text-black text-1xl">entries</span>
            </div>
            <input
              type="text"
              placeholder="🔍 Search by reporter..."
              className="border p-2 rounded text-black mr-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="p-6 bg-white rounded-lg shadow-md mt-6 ml-10 mr-5">
          {loading ? (
            <p>Loading reports...</p>
          ) : error ? (
            <p className="text-red-500">Error loading reports: {error.message}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-black">
                    <th className="p-3 text-left">Report ID</th>
                    <th className="p-3 text-left">Reporter</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Reason</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report, index) => {
                    let formattedDate = "N/A";
                    let formattedTime = "N/A";

                    if (report.dateSubmitted?._seconds) {
                      const date = new Date(report.dateSubmitted._seconds * 1000);
                      formattedDate = format(date, "MM/dd/yyyy");
                      formattedTime = format(date, "h:mm a");
                    }

                    return (
                      <tr
                        key={report.id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        onClick={() => {
                          setSelectedReport({ ...report, reportId: report.id });
                          setIsReportViewModalOpen(true);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <td className="p-3 text-black">{report.id}</td>
                        <td className="p-3 text-black">{report.studentName}</td>
                        <td className="p-3 text-black">{formattedDate}</td>
                        <td className="p-3 text-black">{formattedTime}</td>
                        <td className="p-3 text-black">{report.reason}</td>
                        <td
                          className={`p-3 font-bold ${
                            report.status === "Responded"
                              ? "text-green-600"
                              : "text-yellow-500"
                          }`}
                        >
                          {report.status || "Pending"}
                        </td>
                        <td className="p-3 flex space-x-3"
                            onClick={(e) => e.stopPropagation()}>
                          <FaEdit
                            className="text-blue-500 cursor-pointer"
                            onClick={() => {
                              setSelectedStudent({
                                name: report.studentName,
                                id: report.studentId,
                                notifId: report.id,
                                schoolId: report.schoolId,
                                reportId: report.id,
                              });
                              setIsResponseModalOpen(true);
                            }}
                          />
                          <FaTrash className="text-red-500 cursor-pointer" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center">
          <button className="px-4 py-2 bg-gray-200 text-black rounded mr-2 hover:bg-gray-700 transition">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded mx-2">2</button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded">3</button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded ml-2 hover:bg-gray-700 transition">
            Next
          </button>
        </div>

        {/* Modals */}
        {isReportViewModalOpen && selectedReport && (
          <ReportDetailsModal
            selectedReport={selectedReport}
            setSelectedStudent={setSelectedStudent}
            setIsResponseModalOpen={setIsResponseModalOpen}
            setIsReportViewModalOpen={setIsReportViewModalOpen}
          />
        )}

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

export default Reports;
