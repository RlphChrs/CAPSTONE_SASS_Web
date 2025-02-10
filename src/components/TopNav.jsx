import React, { useState } from "react";
import { FaBell, FaCog, FaUser } from "react-icons/fa";

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0B0D21] text-white flex items-center justify-between px-6 py-3 fixed top-0 left-0 right-0 shadow-md z-50">
      {/* Left Section: Logo + Breadcrumb */}
      <div className="flex items-center space-x-4">
        <img src="/image/logo.png" alt="SAAS Logo" className="w-10 h-10" />
        <span className="text-lg font-semibold">SAAS</span>
        <div className="text-gray-400 text-sm">
          Pages / <span className="text-white">Upload Knowledge</span>
        </div>
      </div>

      {/* Right Section: Buttons & Search */}
      <div className="flex items-center space-x-4">
        {/* Subscribe Button */}
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-md font-medium">
          Subscribe
        </button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Type..."
          className="bg-white text-black px-3 py-1 rounded-md focus:outline-none"
        />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span className="text-sm">J. Smith</span>
            <img src="../image/picture.png" alt="Profile" className="h-8 w-8 rounded-full" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
              <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-200">
                <FaUser className="mr-2" /> Profile
              </a>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-200">
                <FaCog className="mr-2" /> Settings
              </a>
              <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-200">
                Logout
              </a>
            </div>
          )}
        </div>

        {/* Icons: Notification & Settings */}
        <button className="text-gray-400 hover:text-white">
          <FaBell size={18} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <FaCog size={18} />
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
