import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { forgotPassword, resetPassword } from "../api/api";

const ForgotPassword = ({ onClose, onLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setMessage("");
    
    if (!email.trim()) {
      setMessage("Please enter your email address");
      return;
    }
    
    try {
      const response = await forgotPassword(email);
      
      if (response.message) {
        setStep(2);
        setMessage("OTP sent to your email");
        setIsSuccess(true);
      } else {
        setMessage(response.message || "Failed to send OTP. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error. Please try again later.");
      setIsSuccess(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsSuccess(false);
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setIsSuccess(false);
      return;
    }
    
    try {
      const response = await resetPassword(resetToken, newPassword);
      
      if (response.message) {
        setStep(3);
        setMessage("Password reset successful!");
        setIsSuccess(true);
      } else {
        setMessage(response.message || "Failed to reset password. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error. Please try again later.");
      setIsSuccess(false);
    }
  };

//   const handleBackToLogin = () => {
//     navigate("/login");
//     if (onClose) onClose();
//   };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50 p-4">
      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md flex flex-col items-center relative">
        <button
          className="absolute top-3 left-4 text-white text-2xl font-bold hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center w-full">
          <img src={logo} alt="JK Logo" className="w-12 h-12 object-contain mb-2" />
          <h3 className="text-xl sm:text-2xl text-white mb-4 text-center">
            {step === 1
              ? "Reset Your Password"
              : step === 2
              ? "Enter OTP & New Password"
              : "Password Reset Complete"}
          </h3>
        </div>

        <div className="w-full px-6 flex flex-col items-center">
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="w-full flex flex-col gap-4">
              <p className="text-gray-400 text-center mb-2">
                Enter your email address and we'll send you an OTP to reset your password.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-white bg-transparent border border-gray-400 rounded-md p-3 focus:border-blue-500 outline-none"
                placeholder="Email"
              />
              <button
                type="submit"
                className="bg-white text-black w-full py-3 rounded-full font-bold"
              >
                Send OTP
              </button>
              <button
                type="button"
                className="text-white bg-transparent border border-gray-500 px-4 py-2 rounded-md mt-2"
                onClick={onLogin}
              >
                Back to Login
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="w-full flex flex-col gap-4">
              <input
                type="text"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
                className="w-full text-white bg-transparent border border-gray-400 rounded-md p-3 focus:border-blue-500 outline-none"
                placeholder="Enter OTP"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full text-white bg-transparent border border-gray-400 rounded-md p-3 focus:border-blue-500 outline-none"
                placeholder="New Password"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full text-white bg-transparent border border-gray-400 rounded-md p-3 focus:border-blue-500 outline-none"
                placeholder="Confirm New Password"
              />
              <button
                type="submit"
                className="bg-white text-black w-full py-3 rounded-full font-bold"
              >
                Reset Password
              </button>
              <button
                type="button"
                className="text-white bg-transparent border border-gray-500 px-4 py-2 rounded-md mt-2"
                onClick={() => setStep(1)}
              >
                Back
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="bg-green-900/20 border border-green-500 text-green-400 p-4 rounded-md text-center">
                <p>Your password has been reset successfully!</p>
                <p className="mt-2">You can now log in with your new password.</p>
              </div>
              <button
                className="bg-white text-black w-full py-3 rounded-full font-bold"
                onClick={onLogin}
              >
                Back to Login
              </button>
            </div>
          )}

          {message && (
            <p className={`mt-3 text-center ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;