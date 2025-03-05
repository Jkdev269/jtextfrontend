import React, { useState, useContext } from "react";
import { loginUser, signInWithGoogle, signInWithGitHub } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = ({ onClose, onSignUp,onForgotPassword }) => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.email.trim() === "") {
      setMessage("Please enter your email.");
    } else {
      setShowPasswordField(true);
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.user) {
        setUser(response.user);
        navigate("/", { replace: true });
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Try again.");
    }
  };
  const handleGoogleSignIn = async () => {
    setMessage("");
    try {
      const response = await signInWithGoogle();
      if (response.user) {
        setUser(response.user);
        navigate("/", { replace: true });
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage("Google sign-in failed. Please try again.");
    }
  };

  const handleGitHubSignIn = async () => {
    setMessage("");
    try {
      const response = await signInWithGitHub();
      if (response.user) {
        setUser(response.user);
        navigate("/", { replace: true });
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage("GitHub sign-in failed. Please try again.");
    }
  };

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
          <h3 className="text-xl sm:text-2xl text-white mb-4 text-center">Sign in to JText</h3>
        </div>

        <div className="w-full px-6 flex flex-col items-center">
          {!showPasswordField && (
            <>
              <button
                className="bg-white text-black w-full py-3 rounded-full flex items-center justify-center gap-2 mb-3"
                onClick={handleGoogleSignIn}
              >
                <img className="w-5 h-5" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" />
                Sign in with Google
              </button>
              <button
                className="bg-gray-800 text-white w-full py-3 rounded-full flex items-center justify-center gap-2 mb-4"
                onClick={handleGitHubSignIn}
              >
                <img className="w-5 h-5" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
                Sign in with GitHub
              </button>
              <div className="w-full flex items-center my-4">
                <hr className="flex-1 border-gray-600" />
                <span className="mx-2 text-gray-400">or</span>
                <hr className="flex-1 border-gray-600" />
              </div>
            </>
          )}

          <form onSubmit={showPasswordField ? handleSubmit : handleNext} className="w-full flex flex-col gap-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full text-white bg-transparent border border-gray-400 rounded-md p-3 focus:border-blue-500 outline-none"
              placeholder="Email"
              disabled={showPasswordField}
            />

            {showPasswordField && (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full text-white bg-transparent border border-gray-400 rounded-md p-3 focus:border-blue-500 outline-none"
                placeholder="Password"
              />
            )}

            <button
              type="submit"
              className="bg-white text-black w-full py-3 rounded-full font-bold"
            >
              {showPasswordField ? "Login" : "Next"}
            </button>
          </form>

          {showPasswordField && (
            <button
              className="text-white bg-transparent border border-gray-500 px-4 py-2 rounded-md mt-3"
              onClick={onForgotPassword}
              // onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          )}

          {message && <p className="text-red-500 mt-3 text-center">{message}</p>}

          {!showPasswordField && (
            <div className="mt-4 text-center w-full">
              <h4 className="text-white">Don't have an account?</h4>
              <button
                className="text-blue-500 border border-gray-500 bg-black px-4 py-2 rounded-md mt-2 w-full"
                onClick={onSignUp}
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;