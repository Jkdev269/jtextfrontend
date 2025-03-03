import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
// import Login from "./pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Page from "./Pages/Page";
import { Toaster } from "react-hot-toast";
import JtextLandingPage from "./LandingPage/JtextLandingPage";

const PrivateRoute = ({ children }) => {
  const { user,isLoading } = useContext(AuthContext);
  console.log("PrivateRoute user:", user)
  
  if (isLoading) 
    {
      return <div className=" bg-black flex items-center justify-center h-[100vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
    } // Prevent redirect before checking state
  
  return user ? children : <Navigate to="/Jtext" />;
};


const AppRoutes = () => {
  return (
        <AuthProvider>
        <Toaster position="bottom-right" />
     <BrowserRouter>
        <Routes>
          <Route path="/Jtext" element={<JtextLandingPage />} />
          <Route path="/loginpage" element={<Page />}/>
          {/* <Route path="/login" element={<Signup />} />  */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/Jtext" />} />
        </Routes>
    </BrowserRouter>
          </AuthProvider>
      
  );
};

export default AppRoutes;
