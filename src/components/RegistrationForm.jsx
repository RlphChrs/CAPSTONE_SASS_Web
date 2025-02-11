import React, { useState } from 'react';
import { useRegister } from '../hooks/useRegister';  
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userId: `sao${Date.now()}`,
    schoolName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    termsAccepted: false,
  });

  const { register, loading, error, success } = useRegister();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!formData.termsAccepted) {
      alert('You must accept the terms and conditions.');
      return;
    }

    try {
      await register(formData);
      alert('Registration successful! Redirecting to login...');
      navigate('/login'); //navigate to login page
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };


  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
      <h3 className="text-1xl mb-6 text-center">Enter your Name, Email, and Password to sign up.</h3>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* ✅ Error Message */}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>} {/* ✅ Success Message */}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleChange}
          placeholder="Name of School or University"
          className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex space-x-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-1/2 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-1/2 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex space-x-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-1/2 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            placeholder="Repeat Password"
            className="w-1/2 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mr-2"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-400">
            I agree to the <span className="text-blue-400">terms and conditions</span>.
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-semibold"
          disabled={loading} // ✅ Disable button while loading
        >
          {loading ? 'Registering...' : 'REGISTER'}
        </button>
      </form>

      <div className="flex items-center justify-center mt-4">
        <hr className="w-1/4 border-gray-600" />
        <span className="px-2 text-gray-400">or register with</span>
        <hr className="w-1/4 border-gray-600" />
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center bg-white text-gray-800 p-3 rounded-md mt-4 shadow-md"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google Icon"
          className="w-5 h-5 mr-2"
        />
        Sign in with Google
      </button>

      <p className="text-sm text-gray-400 text-center mt-4">
        Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
