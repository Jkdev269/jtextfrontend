// import { useState } from "react";
// import { UsersIcon, UserIcon, BellIcon } from "@heroicons/react/outline";

// const Sidebar = ({ setActiveTab }) => {
//   return (
//     <div className="w-1/4 h-screen bg-dark text-light p-4">
//       <h2 className="text-xl font-bold">Chat</h2>

//       {/* Navigation Buttons */}
//       <button
//         onClick={() => setActiveTab("users")}
//         className="p-3 bg-primary flex items-center gap-2 rounded w-full my-2"
//       >
//         <UsersIcon className="w-1" /> All Users
//       </button>

//       <button
//         onClick={() => setActiveTab("requests")}
//         className="p-3 bg-primary flex items-center gap-2 rounded w-full my-2"
//       >
//         <BellIcon className="w-5" /> Friend Requests
//       </button>

//       <button
//         onClick={() => setActiveTab("profile")}
//         className="p-3 bg-primary flex items-center gap-2 rounded w-full my-2"
//       >
//         <UserIcon className="w-5" /> Profile
//       </button>
//     </div>
//   );
// };

// export default Sidebar;


import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Styles/SidebarStyle.module.css"

const Sidebar = ({ activeTab, setActiveTab, setSelectedFriend,selectedFriend }) => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/friends", {
          withCredentials: true,
        });
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, []);

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.sidebarContainer}>
      <h2 className={styles.sidebarHeading}>Chats</h2>

      <input
        type="text"
        placeholder="Search..."
        className={styles.searchBox}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.friendList}>
        {filteredFriends.length === 0 ? (
          <p className={styles.noFriends}>No friends found</p>
        ) : (
          filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className={styles.friendItem}
              onClick={() => setSelectedFriend(friend)}
            >
              <img
                src={friend.profileImage || "/default-avatar.png"}
                alt="Profile"
                className={styles.avatar}
              />
              <div className={styles.friendInfo}>
                <p className={styles.friendName}>{friend.name}</p>
                <p className={styles.friendUsername}>@{friend.username}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.navButtons}>
        <button
          className={`${styles.navButton} ${activeTab === "profile" ? styles.active : ""}`}
          onClick={() => {
            setSelectedFriend(null);
            setActiveTab("profile");
          }}
        >
          👤 Profile
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "requests" ? styles.active : ""}`}
          onClick={() => {
            setSelectedFriend(null);
            setActiveTab("requests");
          }}
        >
          🤝 Friend Requests
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "users" ? styles.active : ""}`}
          onClick={() => {
            setSelectedFriend(null);
            setActiveTab("users");
          }}
        >
          👥 All Users
        </button>
      </div>
    </div>
  );
};

export default Sidebar;




