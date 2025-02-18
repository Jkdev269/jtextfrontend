import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Styles/UserListStyle.module.css"

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/search", { withCredentials: true }, {
        params: { query: searchTerm || "" },
      });

      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  const handleSendRequest = async (toUsername, fromUsername) => {
    try {
      await axios.post(
        "http://localhost:8081/api/send-request",
        { fromUsername, toUsername },
        { withCredentials: true }
      );
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.userListContainer}> {/* Use CSS module classes */}
        <h2 className={styles.userListHeading}>All Users</h2>

        <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.userListSearch}
        />

        <ul className={styles.userList}>
            {users.length > 0 ? (
                users.map((user) => (
                    <li key={user._id} className={styles.userListItem}>
                        <div className={styles.userListUserInfo}>
                            <img
                                src={user.profileImage} // Replace with your image source
                                alt="Profile"
                                className={styles.userListAvatar}
                            />
                            <div>
                                <p className={styles.userListName}>{user.name}</p>
                                <p className={styles.userListUsername}>@{user.username}</p>
                            </div>
                        </div>
                        <button
                            className={styles.userListButton}
                            onClick={() => handleSendRequest(user.username)}
                        >
                            Send Request
                        </button>
                    </li>
                ))
            ) : (
                <p className={styles.userListNoUsers}>No users found</p>
            )}
        </ul>
    </div>
);

};

export default UserList;