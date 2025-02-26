import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
// import Login from "./pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Page from "./Pages/Page";
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user,isLoading } = useContext(AuthContext);
  console.log("PrivateRoute user:", user)
  
  if (isLoading) 
    {
      return <div className=" bg-black flex items-center justify-center h-[100vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
    } // Prevent redirect before checking state
  
  return user ? children : <Navigate to="/login" />;
};


const AppRoutes = () => {
  return (
        <AuthProvider>
        <Toaster position="bottom-right" />
     <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Page />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </BrowserRouter>
          </AuthProvider>
      
  );
};

export default AppRoutes;
