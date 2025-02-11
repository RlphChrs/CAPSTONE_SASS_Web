import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from '../assets/Google-icon.png';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      alert('Login successful!');
      navigate('/dashboard'); // ✅ Redirect to dashboard after login
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Enter your email and password to sign in.
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="********"
            className="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <button
          type="button"
          className="w-full py-2 flex items-center justify-center bg-white text-black rounded-md hover:bg-gray-200"
        >
          <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>
      </form>

      <p className="mt-4 text-sm">
        Are you new?{' '}
        <a href="/register" className="text-blue-400 hover:underline">
          Create an account
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
