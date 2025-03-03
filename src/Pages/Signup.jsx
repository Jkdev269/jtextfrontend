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
    setMessage('');
    try {
      const response = await signupUser(formData);
      if (response?.data?.message) {
        setMessage(response.data.message);
      } else {
        setMessage('Signup successful!');
      }
      navigate('/login');
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50 px-4">
      <div className="bg-black p-6 rounded-lg relative w-full max-w-[400px] shadow-lg flex flex-col items-center">
        <button className="absolute top-3 left-4 text-white text-3xl font-bold cursor-pointer hover:text-red-500" onClick={onClose}>
          &times;
        </button>
        <img src={logo} alt="JK Logo" className="w-16 h-16 object-contain mb-4" />
        <h3 className="text-2xl mb-4 text-center text-white">Create your account</h3>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {['username', 'email', 'password'].map((field) => (
            <div key={field} className="relative">
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full h-12 p-3 text-white text-lg border border-gray-300 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
              />
              <label className={`absolute left-2 text-gray-400 text-lg transition-all duration-300 pointer-events-none ${formData[field] ? 'top-0 left-2 text-sm text-blue-500' : 'top-4 left-2 text-lg'}`}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
          <button type="submit" disabled={isLoading} className="w-full py-3 text-lg font-bold rounded-full bg-blue-500 text-white hover:bg-blue-600">
            {isLoading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
        {message && <p className="text-center text-red-500 mt-2">{message}</p>}
        <div className="w-full flex items-center justify-center mt-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <div className="flex flex-col items-center mt-4">
          <h4 className="text-lg text-center text-white">Already have an account?</h4>
          <button className="mt-2 text-blue-600 border-2 border-gray-300 px-8 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300" onClick={onLogin}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
