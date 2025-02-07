import React from 'react';
import RegistrationForm from '../Components/RegistrationForm';
import Sidebar from '../Components/Sidebar';

const RegistrationPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-900 to-gray-900">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-6">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;