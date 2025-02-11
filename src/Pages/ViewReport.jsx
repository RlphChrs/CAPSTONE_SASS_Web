import React from "react";
import { FaReply, FaShare, FaPaperPlane, FaTimes, FaUser, FaPrint, FaStar, FaWindowMinimize, FaTrash } from "react-icons/fa";
import DashboardHeader from "../components/DashboardHeader";
import SideNav from "../components/SideNav";

const ReportPage = () => {
  return (
    <div className="flex min-h-screen text-black">
      {/* Sidebar */}
      <SideNav />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <div className="p-6">
          {/* Report ID */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mt-13 text-left text-white">
              Report ID <span className="text-gray-500">#877832</span>
            </h2>
          </div>
        </div>
        <div className="p-4">
          {/* Report Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg min-h-screen">
            <div className="flex items-center justify-between">
              <h3 className="text-xl mt-2 text-left">Stealing</h3>
              <div className="flex space-x-3">
                <FaPrint className="text-gray-600 cursor-pointer" />
                <FaShare className="text-gray-600 cursor-pointer" />
              </div>
            </div>
            
            <div className="mt-4 p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <FaUser className="text-gray-600 mr-2" />
                <p className="font-semibold">Michelle Rivera</p>
                <span className="ml-auto text-sm text-gray-500">9:14 AM (8 hours ago)</span>
              </div>
              <p className="text-gray-700">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt
                mollit dolore cillum minim tempor enim.
              </p>
              
              {/* Quick Replies */}
              <div className="mt-4 flex space-x-2">
                <button className="border px-3 py-1 rounded-lg">We will be there!</button>
                <button className="border px-3 py-1 rounded-lg">Thanks for the update!</button>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition">
                  <FaReply className="mr-2" /> Reply
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-700 transition">
                  <FaShare className="mr-2" /> Forward
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* New Message Modal */}
        <div className="fixed bottom-4 right-4 w-[600px] h-[450px] bg-white p-4 rounded-lg shadow-lg border">
          <div className="flex justify-between items-center bg-gray-900 text-white p-2 rounded-t-md">
            <h3 className="text-lg font-semibold">New Message</h3>
            <div className="flex space-x-3">
              <FaWindowMinimize className="cursor-pointer" />
              <FaTimes className="cursor-pointer" />
            </div>
          </div>
          <input type="text" placeholder="Recipients" className="w-full  p-2 mt-2 rounded-md" />
          <input type="text" placeholder="Subject" className="w-full p-2 mt-2 rounded-md" />
          <textarea placeholder="Body Text" className="w-full focus:outline-none p-2 mt-2 rounded-md h-24"></textarea>
          <div className="flex justify-between items-center mt-30">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700 transition">
              <FaPaperPlane className="mr-2" /> Send
            </button>
            <FaTrash className="text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
