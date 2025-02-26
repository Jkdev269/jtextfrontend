import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL; // Your backend URL
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        withCredentials: true,
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
        `${API_URL}/send-request`,
        { fromUsername, toUsername },
        { withCredentials: true }
      );
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 bg-black h-screen overflow-y-auto">
      <h2 className="text-center text-xl font-semibold mb-4 text-white">All Users</h2>
      
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      
      <ul className="flex flex-col gap-2">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} className="p-3 bg-gray-900 rounded-md flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-600 mr-3"
                />
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-400 text-sm">@{user.username}</p>
                </div>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                onClick={() => handleSendRequest(user.username)}
              >
                Send Request
              </button>
            </li>
          ))
        ) : (
         <div className="  flex items-center justify-center h-[100vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
        )}
      </ul>
    </div>
  );
};

export default UserList;
