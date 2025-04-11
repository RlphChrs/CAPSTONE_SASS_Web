import { useState } from "react";
import { AiFillEdit } from "react-icons/ai"; // Using react-icons

export default function EditProfile({ user, setIsEditing }) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false); // Exit edit mode without saving
  };

  return (
    <div className="p-6 text-black max-w-1xl mx-auto item-left">
      {/* Edit Profile Title */}
      <h2 className="relative text-gray-900 text-left text-[20px] font-medium pb-3 ml-4 after:absolute after:left-0 after:bottom-[-5px] after:w-25 after:h-[2px] after:bg-indigo-500 after:transition-transform after:duration-300 hover:after:scale-x-50">
        Edit Profile
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-6 mt-6 items-start">
        {/* Profile Image Section */}
        <div className="relative flex flex-col items-center">
          <img
            src="./image/logo.png"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          {/* Edit button overlay */}
          <label className="absolute bottom-2 right-3 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md">
            <AiFillEdit size={18} />
            <input type="file" className="hidden" />
          </label>
        </div>

        {/* User Information Fields */}
        <div className="col-span-2 grid grid-cols-2 gap-x-16 gap-y-4 text-left w-full">
          {[  
            { label: "Your Name", name: "name" },
            { label: "User Name", name: "username" },
            { label: "Email", name: "email", disabled: true },
            { label: "Date of Birth", name: "dob" },
            { label: "Present Address", name: "address" },
            { label: "School", name: "school" },
            { label: "City", name: "city" },
            { label: "Postal Code", name: "postalCode" },
            { label: "Country", name: "country" },
          ].map(({ label, name, type = "text", disabled = false }) => (
            <div key={name} className="flex flex-col w-full">
              <label className="text-gray-500 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                disabled={disabled}
                className={`p-2 border-2 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 ${
                  disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-6 gap-4">
        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="px-15 py-3 bg-gray-300 text-gray-800 rounded-xl text-lg shadow-md hover:bg-gray-400"
        >
          Cancel
        </button>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-15 py-4 bg-indigo-800 text-white rounded-xl p-10"
        >
          Save
        </button>
      </div>
    </div>
  );
}
