import { useState, useEffect, useRef, useContext, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext";
import { BsTelephone, BsCameraVideo } from "react-icons/bs";
import { IoSend } from 'react-icons/io5';
import { BsEmojiSmile, BsImage } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import Picker from 'emoji-picker-react';

const socket = io("http://localhost:8081", { withCredentials: true });

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    const debouncedFunction = function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
    debouncedFunction.cancel = function() {
        clearTimeout(timeout);
    };
    return debouncedFunction;
}

const ChatWindow = ({ selectedFriend, setSelectedFriend }) => {
    const { user: loggedInUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const messageListRef = useRef(null);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messageInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messageStatus, setMessageStatus] = useState({});
    const seenMessagesRef = useRef(new Set());

    const isElementVisible = useCallback((el) => {
        if (!messageListRef.current) return false;
        const rect = el.getBoundingClientRect();
        const containerRect = messageListRef.current.getBoundingClientRect();
        return (
            rect.top >= containerRect.top &&
            rect.bottom <= containerRect.bottom
        );
    }, []);

    const markMessageAsSeen = useCallback(async (messageId) => {
        if (!loggedInUser?._id || seenMessagesRef.current.has(messageId)) return;

        try {
            const response = await axios.put(
                `http://localhost:8081/api/private-messages/seen/${messageId}`,
                { userId: loggedInUser._id },
                { withCredentials: true }
            );

            if (response.status === 200) {
                seenMessagesRef.current.add(messageId);
                setMessages(prevMessages => 
                    prevMessages.map(msg => 
                        msg._id === messageId ? { ...msg, status: 'seen' } : msg
                    )
                );
                socket.emit("messageSeen", messageId, loggedInUser._id);
            }
        } catch (error) {
            console.error("❌ Error marking message as seen:", error);
            seenMessagesRef.current.delete(messageId);
        }
    }, [loggedInUser]);

    const markVisibleMessagesSeen = useCallback(() => {
        if (!messageListRef.current || !loggedInUser) return;
    
        const receivedMessages = messageListRef.current.querySelectorAll('.received-message'); // Correct selector
        receivedMessages.forEach(messageEl => {
            const messageId = messageEl.dataset.messageId;
            if (!messageId || seenMessagesRef.current.has(messageId)) return;
    
            if (isElementVisible(messageEl)) {
                markMessageAsSeen(messageId);
            }
        });
    }, [loggedInUser, isElementVisible, markMessageAsSeen]);

    const debouncedScrollHandler = useCallback(
        debounce(() => markVisibleMessagesSeen(), 100),
        [markVisibleMessagesSeen]
    );

    // Fetch messages effect
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedFriend || !loggedInUser) {
                setMessages([]);
                setLoadingMessages(false);
                return;
            }

            setLoadingMessages(true);
            try {
                const response = await axios.get(
                    `http://localhost:8081/api/private-messages/${selectedFriend.username}/${loggedInUser.username}`,
                    { withCredentials: true }
                );
                
                // Process and set messages
                const processedMessages = response.data.map(msg => ({
                    ...msg,
                    imageUrl: msg.imageUrl ? msg.imageUrl : null
                }));
                
                setMessages(processedMessages);
                seenMessagesRef.current.clear();
                
                // Join the room after fetching messages
                if (loggedInUser._id && selectedFriend._id) {
                    socket.emit("joinRoom", loggedInUser._id);
                    socket.emit("joinRoom", selectedFriend._id);
                }
                
                // Scroll to bottom after messages are loaded
                setTimeout(scrollToBottom, 0);
            } catch (error) {
                console.error("❌ Error fetching messages:", error);
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchMessages();

        // Cleanup function
        return () => {
            if (loggedInUser && selectedFriend) {
                socket.emit("leaveRoom", loggedInUser._id);
                socket.emit("leaveRoom", selectedFriend._id);
            }
        };
    }, [selectedFriend, loggedInUser]);


    const scrollToBottom = () => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    };

    // Scroll and message seen effect
    useEffect(() => {
        const messageContainer = messageListRef.current;
        if (messageContainer) {
            messageContainer.addEventListener('scroll', debouncedScrollHandler);
            // Only check visible messages after messages are loaded
            if (!loadingMessages) {
                scrollToBottom();
                markVisibleMessagesSeen();
            }
        }

        return () => {
            if (messageContainer) {
                messageContainer.removeEventListener('scroll', debouncedScrollHandler);
            }
            debouncedScrollHandler.cancel();
        };
    }, [debouncedScrollHandler, markVisibleMessagesSeen, loadingMessages]);

    // Online status effect
    useEffect(() => {
        socket.on("userOnline", (userId) => {
            setOnlineUsers(prev => [...prev, userId]);
        });

        socket.on("userOffline", (userId) => {
            setOnlineUsers(prev => prev.filter(id => id !== userId));
        });

        return () => {
            socket.off("userOnline");
            socket.off("userOffline");
        };
    }, []);

    // Message socket events effect
 
    // Message socket events effect - Updated version
    useEffect(() => {
        const handleReceiveMessage = (newMessage) => {
            setMessages(prev => {
                // Check if message already exists to prevent duplicates
                const messageExists = prev.some(msg => msg._id === newMessage._id);
                if (messageExists) return prev;
                
                return [...prev, newMessage];
            });
            
            // Scroll to bottom when new message arrives
            setTimeout(scrollToBottom, 0);
            
            // Mark message as seen if it's received
            if (newMessage.receiver === loggedInUser?._id) {
                markMessageAsSeen(newMessage._id);
            }
        };

        const handleMessageSeen = (messageId, senderId) => {
            if (senderId === selectedFriend?._id) {
                setMessages(prevMessages => 
                    prevMessages.map(msg => 
                        msg._id === messageId ? { ...msg, status: 'seen' } : msg
                    )
                );
            }
        };

        // Set up socket event listeners
        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("messageSeen", handleMessageSeen);

        // Clean up socket event listeners
        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("messageSeen", handleMessageSeen);
        };
    }, [selectedFriend, loggedInUser, markMessageAsSeen]);

    // Clear seen messages when changing friends
    useEffect(() => {
        seenMessagesRef.current.clear();
    }, [selectedFriend]);

    const sendMessage = async () => {
        if (!selectedFriend?._id || !loggedInUser?._id) return;
        const trimmedText = message.trim();
        // Don't send if there's no content at all
        if (!trimmedText && !selectedImage) return;

        try {
            const formData = new FormData();
            formData.append('fromUsername', loggedInUser.username);
            formData.append('toUsername', selectedFriend.username);
            // const trimmedText = message.trim();
        if (trimmedText) {
            formData.append('text', trimmedText);
        } 
            
            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            
            const response = await axios.post(
                "http://localhost:8081/api/private-messages/send",
                formData,
                { withCredentials: true, headers: { "Content-Type": "multipart/form-data" }}
            );

            const newMessage = response.data;
            
            // Update messages state immediately
            setMessages(prev => [...prev, newMessage]);
            
            // Update message status
            setMessageStatus(prev => ({ ...prev, [newMessage._id]: "sent" }));
            
            // Clear input fields
            setMessage("");
            setSelectedImage(null);
            setImagePreview(null);
            
            // Emit socket event
            socket.emit("sendMessage", newMessage);
            
            // Scroll to bottom
            setTimeout(scrollToBottom, 0);

            if (messageInputRef.current) {
                messageInputRef.current.focus();
            }
        } catch (error) {
            console.error("❌ Error sending message:", error);
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setMessage(prev => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
        messageInputRef.current?.focus();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        console.log("📷 Selected File:", file);
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeSelectedImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };


    const getMessageStatus = (message) => {
        if (message.sender !== loggedInUser?._id) return null;
        return message.status || messageStatus[message._id] || "sent";
    };

    const isUserOnline = useCallback((userId) => 
        onlineUsers.includes(userId), [onlineUsers]

    );
    const [selectedImageModal, setSelectedImageModal] = useState(null);
 

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Premium Header */}
            <div className="flex items-center justify-between p-6 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => setSelectedFriend(null)}
                        className="p-2 rounded-full hover:bg-gray-800/50 transition-all duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7" />
                        </svg>
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img 
                                src={selectedFriend?.profileImage || "/default-avatar.png"}
                                alt="Profile"
                                className="w-12 h-12 rounded-full border-2 border-gray-700"
                            />
                            {isUserOnline(selectedFriend?._id) && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                {selectedFriend?.username}
                            </h2>
                            <p className="text-sm text-gray-400">
                                {isUserOnline(selectedFriend?._id) ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="p-3 rounded-full hover:bg-gray-800/50 transition-all duration-300 group">
                        <BsTelephone className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
                    </button>
                    <button className="p-3 rounded-full hover:bg-gray-800/50 transition-all duration-300 group">
                        <BsCameraVideo className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
                    </button>
                </div>
            </div>

            {/* Message Area with Enhanced Styling */}
<div 
    ref={messageListRef}
    className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
>
    {loadingMessages ? (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center">
                <BsImage className="h-8 w-8 text-gray-500" />
            </div>
            <p className="text-gray-500 text-lg">
                Start chatting with {selectedFriend?.username}
            </p>
        </div>
    ) : (
        messages.map((msg, index) => (
            <div
                key={msg._id || index}
                className={`flex ${msg.sender === loggedInUser?._id ? 'justify-end' : 'justify-start'}`}
                data-message-id={msg._id}
            >
                <div className={`
                    rounded-2xl p-4 shadow-lg w-max max-w-[70%] 
                    ${msg.sender === loggedInUser?._id 
                        ? 'bg-blue-600 rounded-br-none' 
                        : 'bg-gray-800/80 rounded-bl-none'}
                `}>
                    {msg.imageUrl && (
                        <div className="mb-2">
                            <img 
                                src={`http://localhost:8081${msg.imageUrl}`}
                                alt="Message attachment"
                                className="rounded-lg max-w-sm hover:opacity-90 transition-opacity cursor-pointer"
                                onClick={() => setSelectedImageModal(`http://localhost:8081${msg.imageUrl}`)}
                            />
                        </div>
                    )}
                    {msg.text && (
                        <p className="text-white/90">{msg.text}</p>
                    )}
                    <div className="flex items-center justify-end mt-2 space-x-2">
                        <span className="text-xs text-white/60">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {getMessageStatus(msg) && (
                            <span className="text-xs text-white/60">
                                {getMessageStatus(msg) === "seen" ? "✓✓" : "✓"}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        ))
    )}
</div>


            {/* Enhanced Input Area */}
            <div className="p-6 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
                {imagePreview && (
                    <div className="relative w-32 h-32 mb-4 group">
                        <img 
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg border border-gray-700"
                        />
                        <button 
                            onClick={removeSelectedImage}
                            className="absolute -top-2 -right-2 bg-red-500 p-2 rounded-full shadow-lg 
                                     hover:bg-red-600 transition-colors duration-300"
                        >
                            <IoMdClose className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <div className="flex items-center space-x-4 bg-gray-800/50 rounded-full p-2">
                    <button 
                        className="p-3 rounded-full hover:bg-gray-700/50 transition-all duration-300"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <BsEmojiSmile className="h-6 w-6 text-gray-400 hover:text-blue-400" />
                    </button>

                    <label className="p-3 rounded-full hover:bg-gray-700/50 transition-all duration-300 cursor-pointer">
                        <BsImage className="h-6 w-6 text-gray-400 hover:text-blue-400" />
                        <input 
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>

                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        ref={messageInputRef}
                    />

                    <button
                        onClick={sendMessage}
                        disabled={!selectedFriend?._id || !loggedInUser?._id}
                        className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <IoSend className="h-6 w-6 text-white" />
                    </button>
                </div>

                {showEmojiPicker && (
                    <div className="absolute bottom-24 left-6">
                        <Picker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>

            {/* Enhanced Image Modal */}
            {selectedImageModal && (
                <div 
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setSelectedImageModal(null)}
                >
                    <div className="relative max-w-4xl max-h-[80vh]">
                        <img 
                            src={selectedImageModal}
                            alt="Full size"
                            className="rounded-lg shadow-2xl"
                        />
                        <button 
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 
                                     transition-all duration-300"
                            onClick={() => setSelectedImageModal(null)}
                        >
                            <IoMdClose className="h-6 w-6 text-white" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

};

export default ChatWindow;