import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-900 to-gray-900 text-white shadow-md w-full">
      <div className="flex items-center space-x-4">
        <img src="/image/logo.png" alt="SASS Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold">SASS</h1>
      </div>
      <nav className="flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-400">Contact</Link>
        <Link to="/pricing" className="hover:text-blue-400">Pricing</Link>
        <Link to="/about" className="hover:text-blue-400">About Us</Link>
        <Link to="/register" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md">Register</Link>
        <Link to="/login" className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-blue-900">Login</Link>
      </nav>
    </header>
  );
};

export default Header;