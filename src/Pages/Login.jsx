import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import LoginImage from '../assets/loginAsset.png';

const Login = () => {
  return (
    <div className="min-h-screen max-w-full text-white flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row items-stretch justify-center p-10">
        
        {/* Left Section Text and Image */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-r from-blue-800 to-blue-900 rounded-l-2xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Student Affairs Office</h2>
          <h4 className="text-2xl mb-2 text-center">Chatbot Support System</h4>
        
          <div className="rounded-lg flex justify-center items-center bg-gray-900">
            <img
              src={LoginImage}
              alt="LoginPreview"
              className="rounded-lg w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Section Registration Form */}
        <div className="w-full md:w-1/2 max-h-full flex flex-col justify-center items-center p-8 bg-gray-800 rounded-r-2xl shadow-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;