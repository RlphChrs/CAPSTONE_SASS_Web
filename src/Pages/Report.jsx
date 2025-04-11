import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";
import { FaEdit, FaTrash } from "react-icons/fa";

const reportsData = [
  { id: "#20462", reporter: "Matt Dickerson", date: "13/05/2022", time: "1:45 PM", reason: "Stealing", status: "Delivered" }
];

const Reports = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1">
        <DashboardHeader />

        {/* Reports Title */}
        <div className="p-4 mb-4 mt-16 text-left">
          <h2 className="text-5xl font-bold text-white">Reports</h2>
        </div>

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

        <div className="p-6 bg-white rounded-lg shadow-md mt-6 ml-10 mr-5">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="p-3 text-10 text-left">Report ID</th>
                  <th className="p-3 text-10 text-left">Reporter</th>
                  <th className="p-3 text-10 text-left">Date</th>
                  <th className="p-3 text-10 text-left">Time</th>
                  <th className="p-3 text-10 text-left">Reason</th>
                  <th className="p-3 text-10 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {reportsData
                  .filter((report) =>
                    report.reporter.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((report, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-3 text-black">{report.id}</td>
                      <td className="p-3 text-black">{report.reporter}</td>
                      <td className="p-3 text-black">{report.date}</td>
                      <td className="p-3 text-black">{report.time}</td>
                      <td className="p-3 text-black">{report.reason}</td>
                      <td
                        className={`p-3 font-bold ${
                          report.status === "Delivered"
                            ? "text-green-500"
                            : report.status === "Process"
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {report.status}
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
          {/* Additional Content You Wanted at the Bottom */}
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

export default Reports;
