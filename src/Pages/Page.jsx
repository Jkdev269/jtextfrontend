import React, { useState } from 'react'
import styles from '../Styles/PageStyle.module.css'
import Login from './Login';
import Signup from './Signup';
function Page() {
  const [showPopup, setshowPopup] = useState(false);
  const [showloginPopup, setshowloginPopup] = useState(false);
  const handelOpenPopup = () => {
    setshowPopup(true);
    setshowloginPopup(false); // Close login popup if open
  };

  const handelClosePopup = () => {
    setshowPopup(false);
  };

  const handelOpenloginPopup = () => {
    setshowloginPopup(true);
    setshowPopup(false); // Close signup popup if open
  };

  const handelCloseloginPopup = () => {
    setshowloginPopup(false);
  };
  return (<>
    <div className={styles["main-content"]}>
      <div className={styles["logo"]}>jK</div>
      <div className={styles["right-section"]}>
        <h1>Happening now</h1>
        <h2>Join today.</h2>
        <button className={styles["google"]}>
          <img className={styles['google-icon']} src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google icon" />
          Sign up with Google
        </button>
         <button className={styles["github"]}>
            <img
              className={styles["github-icon"]}
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub icon"
            />
            Sign up with GitHub
          </button>
        <div className={styles['divider-container']}>
          <hr className={styles['divider']} />
          <span className={styles['divider-text']}>or</span>
          <hr className={styles['divider']} />
        </div>
        <button className={styles["create"]} onClick={handelOpenPopup}>Create account</button>
        <h6 className={styles["h6"]}>By signing up, you agree to the Terms of Service and Privacy <br /> Policy, including Cookie Use.</h6>
        <h4>Already have an account? </h4>
        <button className={styles["signin"]} onClick={handelOpenloginPopup}>Sign in</button>
      </div>
    </div>
    {showPopup && (
     <Signup onClose={handelClosePopup} onLogin={handelOpenloginPopup}/>
    )}
    {showloginPopup && (
      <Login onClose={handelCloseloginPopup} onSignUp={handelOpenPopup}/>
    )}


    <div className={styles["footer"]}>
      <a href="#">About</a>
      {/* <a href="#">Download the X App</a> */}
      <a href="#">Help Center</a>
      <a href="#">Terms of Service</a>
      <a href="#">Privacy Policy</a>

      <p>© 2025 jK Corp.</p>
    </div>
  </>)
}

export default Page