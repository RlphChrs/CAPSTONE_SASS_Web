import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import { FaTrashAlt } from "react-icons/fa";

const students = [
  { id: "21042", name: "Matt Dickenson", course: "BSIT", year: 1, section: "BSIT1B", status: "ACTIVE" },
  { id: "18953", name: "Viktoria", course: "Nursing", year: 4, section: "BSN4A", status: "ACTIVE" },
  { id: "45169", name: "Trixie Byrd", course: "BSIS", year: 3, section: "BSIS3A", status: "OFFLINE" },
  { id: "34304", name: "Brad Mason", course: "BSCRIM", year: 2, section: "BSCRIM2C", status: "OFFLINE" },
  { id: "17188", name: "Sanderson", course: "BSED", year: 4, section: "BSED4B", status: "OFFLINE" },
  { id: "73003", name: "Jun Redfern", course: "MEDTECH", year: 3, section: "BSMT3B", status: "ACTIVE" },
  { id: "58825", name: "Miriam Kidd", course: "BSHM", year: 1, section: "BSHM1A", status: "OFFLINE" },
  { id: "44262", name: "Dominic", course: "BSTM", year: 2, section: "BSTM2A", status: "ACTIVE" },
  { id: "68094", name: "Shanice", course: "IBSA", year: 3, section: "IBSA3A", status: "OFFLINE" },
  { id: "85252", name: "Poppy-Rose", course: "BSBA", year: 1, section: "BSBA1C", status: "OFFLINE" },
  { id: "85252", name: "Poppy-Rose", course: "BSPYSCHO", year: 1, section: "BSPYSCHO1A", status: "OFFLINE" },
  { id: "85252", name: "Poppy-Rose", course: "BSIT", year: 2, section: "BSIT2A", status: "OFFLINE" },
];

const StudentList = () => {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1">
        <DashboardHeader />

        {/* Title */}
        <div className="p-4 mb-4 mt-16 text-left">
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
                  <th className="p-3 text-left">Section</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-3 text-black">{student.id}</td>
                    <td className="p-3 text-black">{student.name}</td>
                    <td className="p-3 text-black">{student.course}</td>
                    <td className="p-3 text-black">{student.year}</td>
                    <td className="p-3 text-black">{student.section}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          student.status === "ACTIVE"
                            ? "bg-green-200 text-green-800"
                            : "bg-orange-200 text-orange-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <FaTrashAlt className="text-red-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
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
