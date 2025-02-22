import React, { useState, useContext } from "react";
import { loginUser } from "../api/api"; // Ensure this handles cookie-based auth
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = ({ onClose, onSignUp }) => {
  const { user, setUser } = useContext(AuthContext);
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

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50 p-4">
      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center relative h-auto sm:h-4/5">
        <button
          className="absolute top-3 left-4 text-white text-2xl font-bold hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex justify-center">
          <img src={logo} alt="JK Logo" className="w-12 h-12 object-contain" />
        </div>

        <h3 className="text-xl sm:text-2xl text-white mb-4">Sign in to JText</h3>

        {!showPasswordField && (
          <>
            <button className="bg-white text-black w-full max-w-xs py-3 rounded-full flex items-center justify-center gap-2 mb-3">
              <img
                className="w-5 h-5"
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google icon"
              />
              Sign in with Google
            </button>
            <button className="bg-gray-800 text-white w-full max-w-xs py-3 rounded-full flex items-center justify-center gap-2">
              <img
                className="w-5 h-5"
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub icon"
              />
              Sign in with GitHub
            </button>
            <div className="flex items-center w-4/5 my-4">
              <hr className="flex-1 border-gray-600" />
              <span className="mx-2 text-gray-400">or</span>
              <hr className="flex-1 border-gray-600" />
            </div>
          </>
        )}

        <form
          onSubmit={showPasswordField ? handleSubmit : handleNext}
          className="w-full max-w-xs flex flex-col gap-6"
        >
<div className="relative">
  <input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    placeholder=" "
    className="peer w-full text-white bg-transparent border border-gray-400 rounded-md p-2 outline-none focus:border-blue-500 disabled:opacity-70"
    disabled={showPasswordField} 
  />
  <label
    htmlFor="email"
    className="absolute left-2 top-2 text-gray-400 transition-all 
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
      peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 
      peer-disabled:top-0 peer-disabled:text-xs peer-disabled:text-gray-400"
  >
    Email
  </label>
</div>


          {showPasswordField && (
           <div className="relative">
           <input
             type="password"
             id="password"
             name="password"
             value={formData.password}
             onChange={handleChange}
             required
             placeholder=" "
             className="peer w-full text-white bg-transparent border border-gray-400 rounded-md p-2 outline-none focus:border-blue-500"
           />
           <label
             htmlFor="password"
             className="absolute left-2 top-2 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
           >
             Password
           </label>
         </div>
         
          )}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-white text-black w-full max-w-xs py-3 rounded-full font-bold"
            >
              {showPasswordField ? "Login" : "Next"}
            </button>
          </div>
        </form>

        {showPasswordField && (
          <div className="mt-4">
            <button
              className="text-white bg-black border border-gray-500 px-4 py-2 rounded-md"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>
        )}

        {message && <p className="text-red-500 mt-2 text-center">{message}</p>}

        {!showPasswordField && (
          <>
            <h4 className="text-white mt-4 text-center">Don't have an account?</h4>
            <div className="flex justify-center mt-2">
              <button
                className="text-blue-500 border border-gray-500 bg-black px-4 py-2 rounded-md"
                onClick={onSignUp}
              >
                Sign up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
