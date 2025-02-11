import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SideNav from '../components/SideNav';
import ProfileDisplay from "../components/ProfileDisplay";


const ProfilePage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <DashboardHeader />

        {/* Profile Content */}
        <div className="p-10 flex flex-col w-full mt-15">
           <ProfileDisplay />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
