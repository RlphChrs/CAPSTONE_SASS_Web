import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 p-6 text-white shadow-xl">
      <h1 className="text-2xl font-bold mb-4">SASS</h1>
      <nav className="space-y-4">
        <Link to="/" className="block text-gray-300 hover:text-white">Home</Link>
        <Link to="/register" className="block text-gray-300 hover:text-white">Register</Link>
        <Link to="/login" className="block text-gray-300 hover:text-white">Login</Link>
      </nav>
    </div>
  );
};

export default Sidebar;