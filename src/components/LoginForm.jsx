import React from 'react';
import GoogleLogo from '../assets/Google-icon.png';

const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Enter your email and password for sign in.
      </h2>
      <form className="w-full space-y-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="flex justify-start text-sm font-medium text-gray-300 mb-1">
            Username or email
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Ralph123"
            className="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="flex justify-start text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="****************"
            className="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-sm text-blue-400 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-700 hover:bg-blue-800 rounded-md text-white font-bold"
        >
          Sign in
        </button>

        <button
          type="button"
          className="w-full py-2 flex items-center justify-center bg-white text-black rounded-md hover:bg-gray-200"
        >
          <img
            src={GoogleLogo}
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
      </form>

      <p className="mt-4 text-sm">
        Are you new?{' '}
        <a href="#" className="text-blue-400 hover:underline">
          Create an account
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
