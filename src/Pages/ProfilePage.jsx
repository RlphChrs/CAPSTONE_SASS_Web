import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SideNav from '../components/SideNav';

const ProfilePage = () => {
  return (
    <>
    <div className="flex min-h-screen">
        {/* Sidebar */}
          <SideNav />
    </div>

    <div className="flex-1 p-6 text-white">
        <DashboardHeader />
        </div>
    </>
  );
};

export default ProfilePage;
