import React from "react";
import DashboardHeader from '../components/DashboardHeader';
import SubscriptionDetails from '../components/subcriptiondetails';
import SideNav from '../components/SideNav'; 
const SubscriptionForm = () => {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1">
        <DashboardHeader />
        <SubscriptionDetails />
      </div>
    </div>
  );
};

export default SubscriptionForm;
