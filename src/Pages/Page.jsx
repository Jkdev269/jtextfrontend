import { useState } from "react";
import { signInWithGoogle, signInWithGitHub } from "../api/api"; 
import Login from "./Login";
import Signup from "./Signup";
import logo from "../assets/logo.png";

function Page() {
  const [showPopup, setshowPopup] = useState(false);
  const [showloginPopup, setshowloginPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handelOpenPopup = () => {
    setshowPopup(true);
    setshowloginPopup(false);
  };

  const handelClosePopup = () => {
    setshowPopup(false);
  };

  const handelOpenloginPopup = () => {
    setshowloginPopup(true);
    setshowPopup(false);
  };

  const handelCloseloginPopup = () => {
    setshowloginPopup(false);
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
    <>
      <div className="flex flex-col sm:flex-row items-center min-h-screen bg-black text-white justify-center px-6 py-10">
        
        {/* Logo on top for mobile, left side for larger screens */}
        <div className="sm:w-1/2 sm:h-1/2 flex justify-center sm:justify-start">
          <img src={logo} alt="not found" className="w-32 sm:w-100 sm:h-100 lg:w-100 lg:h-100 transition-all duration-300" />
        </div>

        {/* Text & Buttons Section */}
        <div className="text-center mt-6 max-w-sm">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Happening now</h1>
          <h2 className="text-xl sm:text-2xl mb-6">Join today.</h2>

          {/* Signup Buttons */}
          <button className="flex items-center justify-center w-full py-3 mb-4 text-black bg-white rounded-full font-bold transition duration-300 hover:bg-gray-200" onClick={handleGoogleSignIn}>
            <img className="w-5 h-5 mr-2" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google icon" />
            Sign up with Google
          </button>
          <button className="flex items-center justify-center w-full py-3 mb-4 bg-gray-800 text-white rounded-full font-bold transition duration-300 hover:bg-gray-700"  onClick={handleGitHubSignIn}>
            <img className="w-5 h-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub icon" />
            Sign up with GitHub
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center w-full my-4">
            <hr className="flex-1 border-gray-600" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-1 border-gray-600" />
          </div>

          {/* Create Account Button */}
          <button className="w-full py-3 mb-4 bg-blue-500 text-white rounded-full font-bold transition duration-300 hover:bg-blue-600" onClick={handelOpenPopup}>
            Create account
          </button>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
          </p>

          {/* Already Have an Account? */}
          <h4 className="mt-6 text-lg">Already have an account?</h4>
          <button className="w-full py-3 mt-2 border border-gray-500 text-blue-400 rounded-full font-bold transition duration-300 hover:bg-gray-800" onClick={handelOpenloginPopup}>
            Sign in
          </button>

          {/* Popups */}
          {showPopup && <Signup onClose={handelClosePopup} onLogin={handelOpenloginPopup} />}
          {showloginPopup && <Login onClose={handelCloseloginPopup} onSignUp={handelOpenPopup} />}

          {/* Footer Links */}
          <div className="text-center text-gray-400 mt-8 text-sm">
            <a href="#" className="mx-2 hover:underline">About</a>
            <a href="#" className="mx-2 hover:underline">Help Center</a>
            <a href="#" className="mx-2 hover:underline">Terms of Service</a>
            <a href="#" className="mx-2 hover:underline">Privacy Policy</a>
            <p className="mt-4">© 2025 jK Corp.</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Page;
