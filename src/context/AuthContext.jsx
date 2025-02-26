import { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../api/api";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  
  
  useEffect(() => {
    console.log("AuthContext user state:", user);
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        console.log("User data fetched on load:", userData);
      } catch (error) {
        console.log("No user found, staying logged out.");
        setUser(null);
      }finally {
        setIsLoading(false); // Set loading to false regardless of outcome
      }
    };
  
    fetchUser();
  }, []);
    // Logout function
    const logout = async () => {
      try {
        await axios.post(
          "http://localhost:8081/api/auth/logout", // Adjust to your backend logout route
          {},
          { withCredentials: true } // Ensure cookies are sent
        );
        setUser(null); // Clear user state
        navigate("/login"); // Redirect to login page
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

  return (
    <AuthContext.Provider value={{user,setUser,isLoading,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
