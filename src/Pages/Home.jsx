import { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";
import FriendRequests from "../components/FriendRequests";
import Profile from "../components/Profile";
import ChatWindow from "../components/ChatWindow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "../Styles/HomeStyle.module.css"

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
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.sidebarArea}>
        <Sidebar setActiveTab={setActiveTab} setSelectedFriend={setSelectedFriend} />
      </div>

      <div className={styles.contentArea}>
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