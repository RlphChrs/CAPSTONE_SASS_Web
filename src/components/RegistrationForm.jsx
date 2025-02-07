import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
      <form className="space-y-4">
        <div className="flex space-x-4">
          <input type="text" placeholder="First Name" className="w-1/2 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Last Name" className="w-1/2 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <input type="email" placeholder="Email" className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <div className="flex space-x-4">
          <input type="password" placeholder="Password" className="w-1/2 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Repeat Password" className="w-1/2 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="terms" className="mr-2" />
          <label htmlFor="terms" className="text-sm text-gray-400">I agree to the <span className="text-blue-400">terms and conditions</span>.</label>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-semibold">REGISTER</button>
      </form>
      <div className="flex items-center justify-center mt-4">
        <hr className="w-1/4 border-gray-600" />
        <span className="px-2 text-gray-400">or register with</span>
        <hr className="w-1/4 border-gray-600" />
      </div>
      <button type="button" className="w-full flex items-center justify-center bg-white text-gray-800 p-3 rounded-md mt-4 shadow-md">
        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Icon" className="w-5 h-5 mr-2" />
        Sign in with Google
      </button>
      <p className="text-sm text-gray-400 text-center mt-4">
        Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
