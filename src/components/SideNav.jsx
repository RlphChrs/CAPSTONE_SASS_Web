import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../assets/home-icon.png";
import tableIcon from "../assets/table-icon.png";
import billingIcon from "../assets/billing-icon.png";
import knowledgeIcon from "../assets/knowledge-icon.png";
import appointmentIcon from "../assets/appointment-icon.png";
import reportIcon from "../assets/Report-icon.png";


const menuItems = [
  { name: "Dashboard", assets: homeIcon, path: "/dashboard" },
  { name: "Tables", assets: tableIcon, path: "/tables" },
  { name: "Billing", assets: billingIcon, path: "/billing" },
  { name: "Upload Knowledge", assets: knowledgeIcon, path: "/upload-knowledge" },
  { name: "Appointment", assets: appointmentIcon, path: "/add-appointment" },
  { name: "Report", assets: reportIcon, path: "/report" },
  { name: "Calendar", assets: billingIcon, path: "calendar-month" }
];

const SideNav = () => {
  const [active, setActive] = useState("/upload"); 

  const handleItemClick = (path) => {
    setActive(path);
  };

  return (
    <div className="w-74 h-275 bg-gray-900 text-white flex flex-col shadow-md mt-16 p-6">
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-1">
              <NavLink
                to={item.path}
                className={`flex items-center p-3 h-18 rounded-md transition-all ${
                  active === item.path
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-800 hover:text-gray-300"
                }`}
                onClick={() => handleItemClick(item.path)}
              >
                <img
                  src={item.assets}
                  alt={item.name}
                  className="w-6 h-6 mr-3 transition-transform transform hover:scale-110"
                />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Help Section */}
      <div className=" mt-20 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-30 rounded-2xl">
        <div className="p-4 rounded-md text-sm text-gray-400 text-center mt-2 pt-10 pb-10">
          <p>NEED HELP?</p>
              <div className="mt-2 ">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-md font-medium transition-transform transform hover:scale-110">
                    <p className="mt-1">
                      <a href="/docs" className="text-white-400">
                       DOCUMENTATION
                      </a>
                    </p>
                </button>
              </div>
        </div>
      </div>
    </nav>
  </div>
  );
};

export default SideNav;
