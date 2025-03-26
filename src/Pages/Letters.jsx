import React, { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { getSAOSubmissions } from "../api/saoAPI";


const Letters = () => {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
        try {
          const token = localStorage.getItem("token");
          const data = await getSAOSubmissions(token);
          setSubmissions(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
    fetchSubmissions();
  }, []);

  const filtered = submissions.filter((entry) =>
    (entry.studentName || "").toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "reviewed":
        return "text-green-500";
      case "pending":
        return "text-orange-500";
      default:
        return "text-red-500";
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1">
        <DashboardHeader />

        {/* Title */}
        <div className="p-4 mb-4 mt-16 text-left">
          <h2 className="text-5xl font-bold text-white">Letters</h2>
        </div>

        {/* Filters */}
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
                {filtered.map((entry, index) => (
                  <tr key={entry.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-3 text-black">{entry.studentId}</td>
                    <td className="p-3 text-black">{entry.studentName}</td>
                    <td className="p-3 text-black">{entry.date}</td>
                    <td className="p-3 text-black">{entry.time}</td>
                    <td className="p-3 text-black">{entry.reason}</td>
                    <td className="p-3">
                      <a
                        href={entry.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </td>
                    <td className={`p-3 font-bold ${getStatusColor(entry.status)}`}>
                      {entry.status === "reviewed"
                        ? "Responded"
                        : entry.status === "pending"
                        ? "Processing"
                        : "Unread"}
                    </td>
                    <td className="p-3 flex space-x-3">
                      <FaEdit className="text-blue-500 cursor-pointer" />
                      <FaTrash className="text-red-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination (static UI for now) */}
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

export default Letters;
