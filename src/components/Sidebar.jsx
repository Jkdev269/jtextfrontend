import React, { useState, useEffect, useCallback } from "react";
import { Search, UserCircle, Users, UserPlus, Menu } from "lucide-react";
import { io } from "socket.io-client";
import axios from "axios";
import logo from "../assets/logo.png";

const API_URL = import.meta.env.VITE_API_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const Sidebar = ({ activeTab, setActiveTab, setSelectedFriend, selectedFriend }) => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const socket = io(SOCKET_URL, { withCredentials: true });

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${API_URL}/friends`, { withCredentials: true });
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    socket.emit("getOnlineUsers");

    const handleUserOnline = (userId) => {
      setOnlineUsers((prev) => (prev.includes(userId) ? prev : [...prev, userId]));
    };

    const handleUserOffline = (userId) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    };

    socket.on("userOnline", handleUserOnline);
    socket.on("userOffline", handleUserOffline);
    socket.on("onlineUsers", (users) => setOnlineUsers(users));

    return () => {
      socket.off("userOnline", handleUserOnline);
      socket.off("userOffline", handleUserOffline);
      socket.off("onlineUsers");
    };
  }, []);

  const isUserOnline = useCallback((userId) => userId && onlineUsers.includes(userId), [onlineUsers]);

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button 
        className="absolute top-4 left-4 z-50 p-2 bg-gray-800 rounded-md md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-gray-700 p-6 transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:flex md:w-60 md:h-[100vh]`}
      >
        <div className="flex flex-col h-full">
          <div className="mb-8">
            <div className="flex justify-center ">
                      <img src={logo} alt="JK Logo" className="w-12 h-12 object-contain" />
                    </div>
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

          <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 scrollbar-hidden">
            {filteredFriends.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                {/* <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div> */}
                <h1>you have no friends</h1>
              </div>
            ) : (
              filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 ${
                    selectedFriend?.id === friend.id ? "bg-gray-800 border-l-4 border-blue-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedFriend(friend);
                    setSidebarOpen(false); // Close sidebar on mobile after selecting
                  }}
                >
                  <div className="relative">
                    <img
                      src={friend.profileImage || "/default-avatar.png"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                    />
                    {isUserOnline(friend.id) && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-white font-semibold">{friend.name}</p>
                    <p className="text-gray-400 text-sm">@{friend.username}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar Buttons */}
          {/* Sidebar Buttons */}
<div className="mt-auto space-y-3 pt-5 border-t border-gray-700">
  <button
    className={`w-full p-0 rounded-lg flex items-center gap-3 transition-colors 
    ${activeTab === "profile" ? "text-blue-500" : "text-gray-300 hover:text-white"}`}
    onClick={() => {
      setSelectedFriend(null);
      setActiveTab("profile");
      setSidebarOpen(false);
    }}
  >
    <UserCircle className="w-5 h-5" />
    Profile
  </button>

  <button
    className={`w-full p-0 rounded-lg flex items-center gap-3 transition-colors 
    ${activeTab === "requests" ? "text-blue-500" : "text-gray-300 hover:text-white"}`}
    onClick={() => {
      setSelectedFriend(null);
      setActiveTab("requests");
      setSidebarOpen(false);
    }}
  >
    <UserPlus className="w-5 h-5" />
    Friend Requests
  </button>

  <button
    className={`w-full p-0 rounded-lg flex items-center gap-3 transition-colors 
    ${activeTab === "users" ? "text-blue-500" : "text-gray-300 hover:text-white"}`}
    onClick={() => {
      setSelectedFriend(null);
      setActiveTab("users");
      setSidebarOpen(false);
    }}
  >
    <Users className="w-5 h-5" />
    All Users
  </button>
</div>

        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
