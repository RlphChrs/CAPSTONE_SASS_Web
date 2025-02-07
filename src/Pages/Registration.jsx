import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import Header from '../components/Header';
import NavigationImage from '../assets/navigation.png';

const Registration = () => {
  return (
    <div className="max-h-screen w-full bg-gradient-to-r from-blue-900 to-gray-900 text-white flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl">
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4">Enhance Student Support</h2>
            <p className="text-gray-300">By using Artificial Intelligence on your Student Affairs Department.</p>
            <div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-md w-full h-full">
              <img src={NavigationImage} alt="Navigation Preview" className="rounded-md w-full h-full" />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 bg-gray-800 rounded-2xl shadow-xl">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;