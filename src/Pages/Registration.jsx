import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import Header from '../components/Header';
import NavigationImage from '../assets/navigation.png';

const Registration = () => {
  return (
    <div className="min-h-screen max-w-full text-white flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row items-stretch justify-center p-6">
        {/* Left Section: Text and Image covering half of the screen */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-r from-blue-800 to-blue-900 rounded-l-2xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Enhance Student Support</h2>
          <p className="text-gray-300 text-center mb-6">
            By using Artificial Intelligence on your Student Affairs Department.
          </p>
          <div className="rounded-sm flex justify-center items-center bg-gray-900">
            <img
              src={NavigationImage}
              alt="Navigation Preview"
              className="rounded-lg w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Section: Registration Form covering the other half of the screen */}
        <div className="w-full md:w-1/2 max-h-full flex flex-col justify-center items-center p-8 bg-gray-800 rounded-r-2xl shadow-xl">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Registration;