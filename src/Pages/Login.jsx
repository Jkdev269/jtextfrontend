import React, { useState, useContext} from "react";
import styles from "../Styles/LoginStyle.module.css";
import { loginUser } from "../api/api"; // Ensure this handles cookie-based auth
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onSignUp }) => {
  const {user,setUser } = useContext(AuthContext);
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
      setMessage(""); // Clear any previous messages
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log("Login Response:", response);
  
      if (response.user) { // Correct condition: check for response.user
        setUser(response.user);
        navigate('/', { replace: true });
      } else {
        console.error("Login failed:", response.message);
        setMessage(response.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Try again.');
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await loginUser(formData);
  //     if(data.success){
  //       setMessage('Login successful! Redirecting...');
  //       navigate('/home'); // Replace with your app's dashboard route
  //     }
  //     else{
  //       alert(data.message);
  //     }
    
  //   } catch (error) {
  //     setMessage(error.response?.data?.message || 'Login failed. Try again.');
  //   }
  // };
  

  // useEffect(() => {
  //   if (user) {
  //     console.log("User state updated, navigating to home...");
  //     navigate("/home");
  //   }
  // }, [user]);
  

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className={styles["popup-overlay"]}>
      <div className={styles["popup"]}>
        <span className={styles["close-btn"]} onClick={onClose}>
          &times;
        </span>
        <div className={styles["logo-popup"]}>jK</div>
        <h3>Sign in to JK</h3>

        {!showPasswordField && (
          <>
            <button className={styles["google"]}>
              <img
                className={styles["google-icon"]}
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google icon"
              />
              Sign in with Google
            </button>
            <button className={styles["github"]}>
              <img
                className={styles["github-icon"]}
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub icon"
              />
              Sign in with GitHub
            </button>

            <div className={styles["Popup_divider-container"]}>
              <hr className={styles["Popup_divider"]} />
              <span className={styles["Popup_divider-text"]}>or</span>
              <hr className={styles["Popup_divider"]} />
            </div>
          </>
        )}

        <form onSubmit={showPasswordField ? handleSubmit : handleNext} className={styles["popup-form"]}>
          {/* Email Input */}
          <div className={styles["input-container"]}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=""
              disabled={showPasswordField}
            />
            <label htmlFor="email">Email</label>
          </div>

          {/* Password Input */}
          {showPasswordField && (
            <div className={styles["input-container"]}>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder=""
              />
              <label htmlFor="password">Password</label>
            </div>
          )}

          {/* Buttons */}
          <div className={styles["popup-buttons"]}>
            <button type="submit">{showPasswordField ? "Login" : "Next"}</button>
          </div>
        </form>

        {showPasswordField && (
          <div className={styles["popup-forgotbuttons"]}>
            <button type="button" onClick={handleForgotPassword}>
              Forgot password?
            </button>
          </div>
        )}

        {message && <p className={styles["message"]}>{message}</p>}

        {!showPasswordField && (
          <>
            <h4>Don't have an account? </h4>
            <button className={styles["Popup_signin"]} onClick={onSignUp}>
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
