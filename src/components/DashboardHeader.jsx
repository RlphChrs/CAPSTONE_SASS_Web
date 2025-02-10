import React, { useState } from "react";
import { FaBell, FaCog, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ApplicationLogo from '../assets/logo.png';

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getPageName = (path) => {
    const formattedPath = path.split('/')[1];
    return formattedPath
      ? formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1).replace('-', ' ')
      : 'Dashboard';
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="bg-[#0B0D21] text-white flex items-center justify-between px-6 py-3 fixed top-0 left-0 right-0 shadow-md z-50">
      <div className="flex items-center space-x-4">
        <img src={ApplicationLogo} alt="SASS Logo" className="w-16 h-10 rounded-lg" />
        <div className="text-gray-400 text-sm ml-50.5">
          Pages / <span className="text-white">{getPageName(location.pathname)}</span>
        </div>
      </div>

      {/* Right Section: Buttons & Search */}
      <div className="flex items-center space-x-8">
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
            className="flex items-center space-x-5 focus:outline-none"
          >
            <span className="text-sm">J. Smith</span>
            <img src="../image/picture.png" alt="Profile" className="h-8 w-8 rounded-full" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
              <button
                onClick={handleProfileClick}
                className="flex items-center px-4 py-2 hover:bg-gray-200 w-full text-left"
              >
                <FaUser className="mr-2" /> Profile
              </button>
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

export default DashboardHeader;
