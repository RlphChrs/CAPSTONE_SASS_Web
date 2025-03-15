import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SideNav from '../components/SideNav';
import SubscriptionPlans from '../components/SubscriptionPlans';
const Subscription = () => {
  return (
    <div className="flex min-h-screen">
    <SideNav />
      <div className="flex-1">
        <DashboardHeader />
        <div>
         <SubscriptionPlans/> 
        </div>   
        
      </div>

    </div>     
  );
};

export default Subscription;
