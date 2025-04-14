import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import { FaTrashAlt, FaEnvelope } from "react-icons/fa";
import { useStudentList } from "../hooks/useStudentList"; 

const StudentList = () => {
  const [search, setSearch] = useState("");
  const { students, loading } = useStudentList(); 

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

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
              <select className="p-2 rounded bg-gray-400 text-black">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span className="text-black text-1xl">entries</span>
            </div>
            <input
              type="text"
              placeholder="🔍 Search..."
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
                  {!loading && filteredStudents.map((student, index) => (
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
        <div className="mt-4 flex justify-center">
          <button className="px-4 py-2 bg-gray-200 text-black rounded mr-2 hover:bg-gray-700 transition">Previous</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded mx-2">2</button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded">3</button>
          <button className="px-4 py-2 bg-gray-200 text-black rounded ml-2 hover:bg-gray-700 transition">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
