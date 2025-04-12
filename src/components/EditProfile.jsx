import { useState } from "react";
import { FiCamera } from "react-icons/fi"; 

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
    setIsEditing(false);
  };

  return (
    <div className="p-6 text-black max-w-1xl mx-auto item-left text-2xl">
      {/* Edit Profile Title */}
      <h2 className="relative text-gray-900 text-left text-[20px] font-medium pb-3 ml-4 after:absolute after:left-0 after:bottom-[-5px] after:w-25 after:h-[2px] after:bg-indigo-500 after:transition-transform after:duration-300 hover:after:scale-x-50">
        Edit Profile
      </h2>

      {/* Layout */}
      <div className="flex gap-8 items-start mt-10">
       {/* Profile Picture */}
        <div className="flex flex-col items-center gap-2 min-w-[120px]">
          {/* Profile Picture Wrapper */}
          <div className="relative w-[100px] h-[100px]">
            <img
            src="./image/logo.png"
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-blue-600"
           />

            {/* Camera Icon */}
            <label className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full cursor-pointer">
              <FiCamera className="text-white" size={16} />
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* User Information Fields */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-4 flex-1">
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
           <label className="text-gray-500 font-medium mb-1">{label}</label>
           <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            disabled={disabled}
            className={`p-6 text-3xl border-3 rounded-2xl w-200 text-gray-700 focus:ring-2 focus:ring-blue-500 ${
            disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
           }`}
            />
         </div>
         ))}
        </div>
     </div>

      {/* Buttons */}
      <div className="flex justify-end mt-20 gap-4">
        <button
          onClick={handleCancel}
          className="px-25 py-6 bg-gray-300 text-gray-800 rounded-xl text-lg shadow-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-25 py-6 bg-indigo-800 text-white rounded-xl text-lg shadow-md hover:bg-indigo-900"
        >
          Save
        </button>
      </div>
    </div>
  );
}
