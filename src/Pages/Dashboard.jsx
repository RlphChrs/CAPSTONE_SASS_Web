import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import SideNav from '../components/SideNav';
import UpgradePlanImage from '../assets/Upgrade-sign.png';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useRegisteredUsers from '../hooks/useRegisteredUsers';

const Dashboard = () => {
  const data = useRegisteredUsers();
  const totalStudents = data.reduce((sum, day) => sum + day.users, 0);
 

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNav />

      <div className="flex-1 p-6 text-white">
        <DashboardHeader />

        {/* Main Section */}
        <div className="flex space-x-5 mt-18 ml-2 h-35">
          {/* Welcome Section */}
          <div className="bg-gray-100 text-gray-900 rounded-lg p-5 flex justify-between items-center shadow-md w-2/3 h-30">
            <div className='text-left'>
              <h2 className="text-3xl font-semibold">Welcome, Ralph Christian Pilapil</h2>
              <p className="text-lg text-gray-600">Hope you're having a nice day</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">10:00 AM</p>
              <p className="text-sm font-semibold">Saturday 14, 2024</p>
            </div>
          </div>

          {/* Upgrade Plan Section */}
          <div className="bg-gray-100 text-gray-900 rounded-lg p-4 flex items-center shadow-md w-1/3 h-30">
            <div className="ml-10">
              <img src={UpgradePlanImage} alt="Upgrade Plan" className="w-15 h-15" />
            </div>
            <div>
              <h2 className="ml-10 text-2xl font-bold">Upgrade Plan</h2>
              <p className="ml-10 text-lg text-gray-600">Upgrade plan for more pleasant experience</p>
            </div>
          </div>
        </div>

        {/* Subscription Message Section */}
        <div className="rounded-lg p-4 flex justify-between items-center w-2/3 ">
          <div className="text-left text-white rounded-lg ml-4">
            <p>Don't miss out on the opportunity to transform the way every school department provides support. Join the growing community of satisfied subscribers today!</p>
            <p className="font-bold text-lg mt-2">Subscribe now and start enjoying all the benefits that SASS has to offer.</p>
          </div>
        </div>

        {/* Analytics Section - Full Width Chart */}
        <div className="ml-2 mr-2">
          <div className="bg-gray-100 text-gray-900 rounded-lg h-auto shadow-md w-full mb-2">
            <h2 className="text-left text-xl font-semibold m-4">Registered Users</h2>
            <p className="text-left m-4 text-sm text-gray-600">{totalStudents.toLocaleString()} Students</p>

            <ResponsiveContainer width="100%" height={650}>
              <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 'dataMax + 5']} />

                <Tooltip />
                <Bar dataKey="users" fill="url(#colorGradient)" barSize={30} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FF7F" stopOpacity={1} />
                    <stop offset="100%" stopColor="#0000FF" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
