import React, { useState, useEffect } from "react";
import { Search, UserCircle, Users, UserPlus } from "lucide-react";
import axios from "axios";

const Sidebar = ({ activeTab, setActiveTab, setSelectedFriend, selectedFriend }) => {
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
    <div className="w-full bg-black p-6 h-screen flex flex-col shadow-xl">
      <div className="mb-8">
        <h2 className="text-white text-2xl font-bold">Chats</h2>
        <p className="text-gray-400 text-sm mt-1">Connect with your friends</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg outline-none border border-gray-700 focus:border-blue-500 transition-colors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {filteredFriends.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No friends found</p>
          </div>
        ) : (
          filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 ${
                selectedFriend?.id === friend.id ? 'bg-gray-800 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => setSelectedFriend(friend)}
            >
              <div className="relative">
                <img
                  src={friend.profileImage || "/default-avatar.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-white font-semibold">{friend.name}</p>
                <p className="text-gray-400 text-sm">@{friend.username}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 space-y-3 pt-6 border-t border-gray-700">
        <button
          className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
            activeTab === "profile"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
          onClick={() => {
            setSelectedFriend(null);
            setActiveTab("profile");
          }}
        >
          <UserCircle className="w-5 h-5" />
          Profile
        </button>
        <button
          className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
            activeTab === "requests"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
          onClick={() => {
            setSelectedFriend(null);
            setActiveTab("requests");
          }}
        >
          <UserPlus className="w-5 h-5" />
          Friend Requests
        </button>
        <button
          className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
          onClick={() => {
            setSelectedFriend(null);
            setActiveTab("users");
          }}
        >
          <Users className="w-5 h-5" />
          All Users
        </button>
      </div>
    </div>
  );
};

export default Sidebar;