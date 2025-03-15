import React, { useState } from "react";
import { FaBell, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ApplicationLogo from '../assets/logo.png';

const DashboardHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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

  const handleLogout = () => {
    console.log("User logged out");

    // Clear any authentication-related data (if applicable)
    localStorage.removeItem("token"); // Example: Removing auth token
    sessionStorage.clear(); // Clear session storage

    // Redirect to the login page
    navigate('/login');
  };

  const handleSubscriptionClick = () => {
    navigate('/subscription'); // Navigate to Subscription page
  };

  return (
    <nav className="bg-[#0B0D21] text-white flex items-center justify-between px-6 py-3 fixed top-0 left-0 right-0 shadow-md z-50">
      <div className="flex items-center space-x-4">
        <img src={ApplicationLogo} alt="SASS Logo" className="w-16 h-10 rounded-lg" />
        <div className="text-gray-400 text-sm ml-50.5">
          Pages / <span className="text-white">{getPageName(location.pathname)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Subscribe Button */}
        <button
          onClick={handleSubscriptionClick}
          className="bg-gradient-to-r from-indigo-600 to-indigo-600 px-4 py-2 rounded-md font-medium"
        >
          Subscribe 
        </button>

        <input
          type="text"
          placeholder="Type..."
          className="bg-white text-black px-3 py-1 rounded-md focus:outline-none"
        />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsSettingsOpen(false);
            }}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span className="text-sm">J. Smith</span>
            <img src="../image/picture.png" alt="Profile" className="h-8 w-8 rounded-full" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
              <button
                onClick={handleProfileClick}
                className="flex items-center px-4 py-2 hover:bg-gray-200 w-full text-left"
              >
                <FaUser className="mr-2" /> Profile
              </button>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <button className="text-gray-400 hover:text-white">
          <FaBell size={18} />
        </button>

        {/* Settings Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              setIsProfileOpen(false);
            }}
            className="text-gray-400 hover:text-white"
          >
            <FaCog size={18} />
          </button>

          {isSettingsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 hover:bg-gray-200 w-full text-left"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
