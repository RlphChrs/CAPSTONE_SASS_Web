import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import { FaTrashAlt, FaEnvelope } from "react-icons/fa";
import { useStudentList } from "../hooks/useStudentList"; 

const StudentList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const { students, loading } = useStudentList(); 

  // Enhanced filter logic to include ID, name, course, and year
  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const course = (student.course || "").toLowerCase();
    const year = (student.year || "").toString().toLowerCase();
    const studentId = (student.studentId || "").toLowerCase();

    return (
      fullName.includes(searchText) ||
      course.includes(searchText) ||
      year.includes(searchText) ||
      studentId.includes(searchText)
    );
  });

  // Pagination calculations
  const indexOfLastStudent = currentPage * entriesPerPage;
  const indexOfFirstStudent = indexOfLastStudent - entriesPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / entriesPerPage);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page on entries change
  };

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1">
        <DashboardHeader />

        {/* Title */}
        <div className="p-4 mb-4 mt-16 text-left ms-6">
          <h2 className="text-5xl font-bold text-white">Student List</h2>
        </div>

        {/* Search and Entries Control */}
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
              placeholder="🔍 Search by ID, name, course, or year..."
              className="border p-2 rounded text-black mr-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="p-6 bg-white rounded-lg shadow-md mt-6 ml-10 mr-5">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg text-sm">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="p-3 text-left">Student ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Year</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {!loading && currentStudents.map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-3 text-black">{student.studentId}</td>
                    <td className="p-3 text-black">{student.firstName} {student.lastName}</td>
                    <td className="p-3 text-black">{student.course || "—"}</td>
                    <td className="p-3 text-black">{student.year || "—"}</td>
                    <td className="p-3 flex space-x-4">
                      <FaEnvelope className="text-blue-500 cursor-pointer hover:text-blue-700" title="Send Message" />
                      <FaTrashAlt className="text-red-500 cursor-pointer hover:text-red-700" title="Delete" />
                    </td>
                  </tr>
                ))}
                {loading && (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">Loading students...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-700 text-black"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
