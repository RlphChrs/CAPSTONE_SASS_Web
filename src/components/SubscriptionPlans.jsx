import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import { fetchPlans } from "../api/saoAPI"; // ensure the path is correct

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlans = async () => {
      try {
        const { data, success } = await fetchPlans();
        if (success) {
          const sortedPlans = [...data].sort((a, b) => {
            let priceA = a.currency !== "PHP" ? a.price * 50 : a.price;
            let priceB = b.currency !== "PHP" ? b.price * 50 : b.price;
            return priceA - priceB;
          });
          setPlans(sortedPlans);
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };

    getPlans();
  }, []);

  const handleToggle = () => setIsAnnual(prev => !prev);

  return (
    <div className="min-h-screen text-white p-6 mt-20">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Choose the Right Plan</h2>
        <p className="text-gray-400 mb-8">
          Select from our available pricing options to power your Student Affairs Office with chatbot support.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span>Bill Monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAnnual}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span>Bill Annually</span>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={{
                ...plan,
                displayPrice: isAnnual ? (plan.price * 12 * 0.9).toFixed(2) : plan.price, // optional: 10% off for annual
              }}
              isLastItem={index === plans.length - 1}
              onSelect={() =>
                navigate("/subscriptiondetails", { state: { plan: plan.name } })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
