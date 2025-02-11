import { useState } from "react";
import EditProfile from "../components/EditProfile";
import { FaEdit } from "react-icons/fa"; // Importing edit icon

export default function ProfileDisplay() {
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: "Ralph Christian",
    email: "ralphc.pilapil@gmail.com",
    username: "Ralph Christian",
    dob: "25 January 1990",
    school: "University of Cebu",
    postalCode: "45962",
    address: "Cebu City",
    city: "Cebu City",
    country: "PH",
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-160">
      {!isEditing ? (
        <div>
          {/* Profile Heading with Underline Effect */}
          <div className="relative text-gray-900 text-left text-[20px] font-medium pb-3 ml-8 after:absolute after:left-0 after:bottom-[-5px] after:w-30 after:h-[2px] after:bg-indigo-500 after:transition-transform after:duration-300 hover:after:scale-x-50">
              Profile
         </div>


          {/* Grid Layout: Image & Edit Button on Left, User Info on Right */}
          <div className="grid grid-cols-[auto_1fr] gap-6 mt-7 items-start">
            {/* Profile Image & Edit Button */}
            <div className="relative flex flex-col items-center gap-10 ml-8">
              <img
                src="./image/logo.png"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition"
              >
                <FaEdit size={16} />
              </button>
            </div>

            {/* User Information Grid */}
            <div className="grid grid-cols-2 gap-10 text-black text-left ml-15">
              {[
                ["Your Name", user.name],
                ["User Name", user.username],
                ["Email", user.email],
                ["Date of Birth", user.dob],
                ["Present Address", user.address],
                ["School", user.school],
                ["City", user.city],
                ["Postal Code", user.postalCode],
                ["Country", user.country],
              ].map(([label, value], index) => (
                <div key={index}>
                  <p className="text-gray-500">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EditProfile user={user} setIsEditing={setIsEditing} />
      )}
    </div>
  );
}
