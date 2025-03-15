import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const SubscriptionPlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const handlePlanSelect = (planName) => {
    navigate(`/subscriptiondetails`, { state: { plan: planName } });
  };

  return (
    <div className="p-6 text-white min-h-screen mt-22">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">The Right Plan for Your Service</h2>
        <p className="text-1xl mt-2 text-gray-400 mt-10">
          We have several powerful plans to enhance student support in your Student Affairs Office.
        </p>

        {/* Toggle Billing */}
        <div className="mt-15 mb-10 flex justify-center items-center gap-4">
          <span>Bill Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span>Bill Annually</span>
        </div>
      </div>

      {/* Plans */}
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-25">
        <div className="flex justify-center gap-6">
          {[
            { name: "Intro", resolution: "720p Resolution" },
            { name: "Base", resolution: "HD Resolution" },
          ].map((plan, index) => (
            <div key={index} className="bg-white-800 text-black p-6 rounded-xl w-64 shadow-md">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <ul className="mt-2 text-black-300 text-sm space-y-2">
                <li>&#10003; Upload Video with {plan.resolution}</li>
                <li>&#10003; Attachment & Post Scheduling</li>
                <li>&#10003; Set your rates</li>
                <li>&#10003; Exclusive Deals</li>
                <li>&#10003; Advanced Statistics</li>
              </ul>
              <p className="mt-4 text-2xl font-bold">₱123 <span className="text-sm">/month</span></p>
              <button 
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white"
                onClick={() => handlePlanSelect(plan.name)}
              >
                Choose Plan
              </button>
            </div>
          ))}

          {/* Pro Plan */}
          <div className="bg-indigo-700 p-4 rounded-xl w-64 shadow-lg relative text-white">
            <span className="absolute top-0 right-0 bg-purple-600 text-xs font-bold px-3 py-1 rounded-bl-lg">Save ₱40</span>
            <h3 className="text-lg font-semibold">Pro</h3>
            <ul className="mt-10 text-gray-200 text-sm space-y-2">
              <li>&#10003; Upload Video with HD Resolution</li>
              <li>&#10003; Attachment & Post Scheduling</li>
              <li>&#10003; Set your rates</li>
              <li>&#10003; Exclusive Deals</li>
              <li>&#10003; Advanced Statistics</li>
            </ul>
            <p className="mt-4 text-2xl font-bold">₱123 <span className="text-sm">/month</span></p>
            <button 
              className="mt-4 w-full bg-white text-blue-700 font-bold py-2 rounded-lg"
              onClick={() => handlePlanSelect("Pro")}
            >
              Try 1 month
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
