import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../assets/home-icon.png";
import tableIcon from "../assets/table-icon.png";
import billingIcon from "../assets/billing-icon.png";
import knowledgeIcon from "../assets/knowledge-icon.png";
import appointmentIcon from "../assets/appointment-icon.png";
import signinIcon from "../assets/signin-icon.png";
import signupIcon from "../assets/signup-icon.png";

// Define menu items with icons
const menuItems = [
  { name: "Dashboard", assets: homeIcon, path: "/dashboard" },
  { name: "Tables", assets: tableIcon, path: "/tables" },
  { name: "Billing", assets: billingIcon, path: "/billing" },
  { name: "Upload Knowledge", assets: knowledgeIcon, path: "/upload-knowledge" },
  { name: "Appointment", assets: appointmentIcon, path: "/add-appointment" },
  { name: "Log In", assets: signinIcon, path: "/login" },
  { name: "Sign Up", assets: signupIcon, path: "/register" },
];

const SideNav = () => {
  const [active, setActive] = useState("/upload"); // Default active page

  const handleItemClick = (path) => {
    setActive(path);
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-md mt-16">
      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-1">
              <NavLink
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-all ${
                  active === item.path
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-800 hover:text-gray-300"
                }`}
                onClick={() => handleItemClick(item.path)}
              >
                <img
                  src={item.assets} // Fixed the image reference
                  alt={item.name}
                  className="w-6 h-6 mr-3 transition-transform transform hover:scale-110"
                />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Section */}
      <div className="p-5">
        <div className="bg-gray-800 p-4 rounded-md text-sm text-gray-400 text-center">
          <p>Need help?</p>
          <p className="mt-1">
            <a href="/docs" className="text-blue-400 hover:underline">
              Check our docs
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
