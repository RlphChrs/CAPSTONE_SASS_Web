import { useState } from "react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 


export default function SubscriptionForm() {
  const [subscription, setSubscription] = useState("annual");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="flex items-center justify-center min-h-screen mt-10 text-black text-left">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            {/* Updated Exit Button */}
            <button 
              className="absolute top-4 left-4 text-gray-500"
              onClick={() => navigate("/subscription")} 
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mt-6">Upgrade to a Pro Membership</h2>
            <p className="text-sm text-gray-500">Get all access and an extra 20% off when you subscribe annually</p>

            <div className="grid grid-cols-2 gap-6 mt-4 ">
              {/* Billing Details */}
              <div>
                <label className="block text-sm font-medium">Billed to</label>
                <input type="text" placeholder="Ralph" className="w-full mt-1 p-2 border rounded-md" />

                <label className="block text-sm font-medium mt-4">Card Number</label>
                <div className="flex items-center space-x-2 border rounded-md p-2">
                  <input type="text" placeholder="1234 5678 9012 3456" className="w-full outline-none" />
                  <FaCcVisa className="text-blue-600 text-xl" />
                  <FaCcMastercard className="text-red-600 text-xl" />
                </div>

                <div className="flex space-x-2 mt-2">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium">Expiry</label>
                    <input type="text" placeholder="MM / YY" className="w-full p-2 border rounded-md" />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium">CVV</label>
                    <input type="text" placeholder="123" className="w-full p-2 border rounded-md" />
                  </div>
                </div>

                <label className="block text-sm font-medium mt-4 text-left">Country</label>
                <div className="relative">
                  <select className="w-full p-2 border rounded-md appearance-none">
                    <option>Philippines</option>
                  </select>
                </div>

                <label className="block text-sm font-medium mt-2 text-left">Zip Code</label>
                <input type="text" placeholder="Zip Code" className="w-full p-2 border rounded-md" />
              </div>

              {/* Subscription Type */}
              <div className="flex flex-col justify-between">
                <label className="block text-sm font-medium">Subscription Type</label>
                <div className="border p-4 rounded-md">
                  <label className="flex items-center space-x-3 mt-3 border p-2 rounded-md cursor-pointer bg-blue-100 ">
                    <input type="radio" name="subscription" checked={subscription === "monthly"} onChange={() => setSubscription("monthly")} className="form-radio" />
                    <div>
                      <p className="font-medium">Pay Monthly</p>
                      <p className="text-sm text-gray-500">₱20 / Month Per Member</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 mt-3 border p-2 rounded-md cursor-pointer bg-blue-100">
                    <input type="radio" name="subscription" checked={subscription === "annual"} onChange={() => setSubscription("annual")} className="form-radio" />
                    <div>
                      <p className="font-medium">Pay Annually <span className="text-blue-500 text-xs">Save 20%</span></p>
                      <p className="text-sm text-gray-500">₱18 / Month Per Member</p>
                    </div>
                  </label>
                </div>

                <p className="text-xs text-gray-500 ">By continuing you agree to our <a href="#" className="text-blue-500">terms and conditions</a>.</p>

                <button onClick={() => setShowModal(true)} className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-blue-700">
                  ⚡ Proceed
                </button>
              </div>
            </div>

            <a href="#" className="text-blue-500 text-sm">Details</a>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
      <div className="text-green-600 text-4xl mb-2">✔</div>
      <h2 className="text-xl font-semibold">Success</h2>
      <p className="text-sm text-gray-500">Your subscription has been successfully submitted</p>
      <button
        onClick={() => {
          setShowModal(false);
          navigate("/dashboard");
        }}
        className="mt-4 bg-indigo-900 text-white py-2 px-6 rounded-md hover:bg-blue-700"
      >
        Ok
      </button>
    </div>
  </div>
)}

    </div>
  );
}
