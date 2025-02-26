import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api/api';
import logo from "../assets/logo.png";

const Signup = ({ onClose, onLogin }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(''); // Clear any previous messages
    try {
      const response = await signupUser(formData);

      // Check if response.data exists and has a message property
      if (response && response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage('Signup successful!'); // Default success message
      }

      // Redirect *after* setting the message to avoid potential race conditions
      navigate('/login');
      setFormData({ username: '', email: '', password: '' });

    } catch (error) {
      // Improved error handling: Check for a response and a message
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else if (error.message) {
        setMessage(error.message); // Use the general error message if available
      } else {
        setMessage('Signup failed. Please try again.'); // Generic error
      }
    } finally {
      setIsLoading(false); // Ensure isLoading is always set to false
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-gray-900/50 z-50 px-4">
      <div className="bg-black p-6 rounded-lg relative w-[90%] sm:w-[80%] md:w-[50%] lg:w-[35%] max-w-md sm:max-w-lg md:max-w-xl shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button className="absolute top-3 left-4 text-white text-3xl font-bold cursor-pointer hover:text-red-500" onClick={onClose}>
          &times;
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="JK Logo" className="w-16 h-16 object-contain" />
        </div>

        <h3 className="text-2xl mb-6 text-center text-white">Create your account</h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4">
          <div className="relative">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full h-12 p-3 text-white text-lg border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label htmlFor="username" className={`absolute left-2 text-gray-400 text-lg transition-all duration-300 pointer-events-none 
              ${formData.username ? 'top-0 left-2 text-sm text-blue-500' : 'top-4 left-2 text-lg'}`}>
              Username
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 p-3 text-white text-lg border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label htmlFor="email" className={`absolute left-2 text-gray-400 text-lg transition-all duration-300 pointer-events-none 
              ${formData.email ? 'top-0 left-2 text-sm text-blue-500' : 'top-4 left-2 text-lg'}`}>
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-12 p-3 text-white text-lg border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label htmlFor="password" className={`absolute left-2 text-gray-400 text-lg transition-all duration-300 pointer-events-none 
              ${formData.password ? 'top-0 left-2 text-sm text-blue-500' : 'top-4 left-2 text-lg'}`}>
              Password
            </label>
          </div>

          <div className="text-center">
            <button type="submit" disabled={isLoading} className="w-full py-3 mb-4 text-lg font-bold rounded-full bg-blue-500 text-white hover:bg-blue-600">
              {isLoading ? 'Signing up...' : 'Signup'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {message && <p className="text-center text-red-500">{message}</p>}

        {/* Divider */}
        <div className="flex items-center justify-center mt-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Sign in Option */}
        <div className="flex flex-col items-center mt-4">
          <h4 className="text-lg text-center text-white">Already have an account?</h4>
          <button className="mt-2 text-blue-600 bg-transparent border-2 border-gray-300 px-8 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300" onClick={onLogin}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
