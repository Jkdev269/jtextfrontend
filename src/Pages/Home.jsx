import { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";
import FriendRequests from "../components/FriendRequests";
import Profile from "../components/Profile";
import ChatWindow from "../components/ChatWindow";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar Section */}
      <div className="border-r border-gray-700 flex flex-col justify-between">
        <Sidebar setActiveTab={setActiveTab} setSelectedFriend={setSelectedFriend} />
      </div>

      {/* Content Section */}
      <div className="flex-1">
        {selectedFriend ? (
          <ChatWindow selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} />
        ) : activeTab === "users" ? (
          <UserList />
        ) : activeTab === "requests" ? (
          <FriendRequests />
        ) : activeTab === "profile" ? (
          <Profile />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
