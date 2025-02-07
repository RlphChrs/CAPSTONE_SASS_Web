import React from 'react';
import { Link } from 'react-router-dom';


const RegistrationForm = () => {
  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-xl w-full max-w-3xl p-8">
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
      <p className="text-sm text-gray-400 text-center mt-4">
        Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
