import React, { useState } from 'react';
import styles from '../Styles/signupStyle.module.css';
import { useNavigate } from 'react-router-dom';
import {signupUser} from '../api/api'
// import axios from 'axios';

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
    setIsLoading(true); // Disable form while loading
    setMessage(''); // Reset previous messages
    try {
      const response = await signupUser(formData)
      navigate('/login')
      setMessage(response.data.message || 'Signup successful! You can now log in.');
      setFormData({ username: '', email: '', password: '' }); // Reset form
      setIsLoading(false); // Re-enable the form
    } catch (error) {
      setMessage(error.message || 'Signup failed. Try again.');
      setIsLoading(false); // Re-enable the form
    }
  };

  return (
    <div className={styles["popup-overlay"]}>
      <div className={styles["popup"]}>
        <span className={styles["close-btn"]} onClick={onClose}>&times;</span>
        <div className={styles["logo-popup"]}>jK</div>
        <h3>Create your account</h3>
        <form onSubmit={handleSubmit} className={styles["popup-form"]}>
          <div className={styles["input-container"]}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder=""
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className={styles["input-container"]}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=""
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles["input-container"]}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=""
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className={styles["popup-buttons"]}>
            <button type="submit" disabled={isLoading}> {isLoading ? 'Signing up...' : 'Signup'}</button>
          </div>
        </form>
        {message && <p className={styles["message"]}>{message}</p>}
        <div className={styles['Popup_divider-container']}>
          <hr className={styles['Popup_divider']} />
          <span className={styles['Popup_divider-text']}>or</span>
          <hr className={styles['Popup_divider']} />
        </div>
        <h4>Already have an account? </h4>
        <button className={styles["Popup_signin"]} onClick={onLogin}>Sign in</button>
      </div>
    </div>
  );
};

export default Signup;
