import { useState, useEffect, useRef, useContext, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import styles from "../Styles/ChatWindowStyle.module.css";
import { AuthContext } from "../context/AuthContext";
import { BsTelephone, BsCameraVideo } from "react-icons/bs";
import { IoSend } from 'react-icons/io5';
import { BsEmojiSmile, BsImage } from 'react-icons/bs';
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
    const messageListRef = useRef(null);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messageInputRef = useRef(null);
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

        const receivedMessages = messageListRef.current.querySelectorAll(`.${styles.received}`);
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
                setMessages(response.data);
                
                // Clear seen messages when fetching new messages
                seenMessagesRef.current.clear();
            } catch (error) {
                console.error("❌ Error fetching messages:", error);
            } finally {
                setLoadingMessages(false);
            }

            socket.emit("joinRoom", loggedInUser._id);
            socket.emit("joinRoom", selectedFriend._id);
        };

        fetchMessages();

        return () => {
            if (loggedInUser && selectedFriend) {
                socket.emit("leaveRoom", loggedInUser._id);
                socket.emit("leaveRoom", selectedFriend._id);
            }
        };
    }, [selectedFriend, loggedInUser]);

    // Scroll and message seen effect
    useEffect(() => {
        const messageContainer = messageListRef.current;
        if (messageContainer) {
            messageContainer.addEventListener('scroll', debouncedScrollHandler);
            // Only check visible messages after messages are loaded
            if (!loadingMessages) {
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
    useEffect(() => {
        const handleReceiveMessage = (newMessage) => {
            if (!newMessage?.text?.trim()) return;
            
            setMessages(prev => [...prev, newMessage]);
            
            if (newMessage.receiver === loggedInUser?._id) {
                markMessageAsSeen(newMessage._id);
            }
        };

        const handleMessageSeen = (messageId, senderId) => {
            if (senderId === selectedFriend?._id) {
                setMessages(prevMessages => prevMessages.map(msg => 
                    msg._id === messageId ? { ...msg, status: 'seen' } : msg
                ));
                setMessageStatus(prev => ({
                    ...prev,
                    [messageId]: 'seen'
                }));
            }
        };

        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("messageSeen", handleMessageSeen);

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
        if (!message.trim() || !selectedFriend?._id || !loggedInUser?._id) return;

        try {
            const response = await axios.post(
                "http://localhost:8081/api/private-messages/send",
                {
                    fromUsername: loggedInUser.username,
                    toUsername: selectedFriend.username,
                    text: message.trim(),
                },
                { withCredentials: true }
            );

            const newMessage = response.data;
            setMessageStatus(prev => ({ ...prev, [newMessage._id]: "sent" }));
            setMessage("");
            socket.emit("sendMessage", newMessage);

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
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log("Image data:", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getMessageStatus = (message) => {
        if (message.sender !== loggedInUser?._id) return null;
        return message.status || messageStatus[message._id] || "sent";
    };

    const isUserOnline = useCallback((userId) => 
        onlineUsers.includes(userId), [onlineUsers]
    );

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <span onClick={() => setSelectedFriend(null)} className={styles.backButton}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.backIcon}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7" />
                    </svg>
                </span>

                <h2 className={styles.chatFriendName}>
                    {selectedFriend?.username}
                    {isUserOnline(selectedFriend?._id) && 
                        <span className={styles.onlineStatus}> (Online)</span>
                    }
                </h2>

                <div className={styles.callIcons}>
                    <span className={styles.callButton}>
                        <BsTelephone />
                    </span>
                    <span className={styles.videoCallButton}>
                        <BsCameraVideo />
                    </span>
                </div>
            </div>

            <div className={styles.messageArea} ref={messageListRef}>
                {loadingMessages ? (
                    <span className={styles.loader}></span>
                ) : messages.length === 0 ? (
                    <p className={styles.messagePlaceholder}>
                        Start your conversation with {selectedFriend?.username}...
                    </p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={msg._id || index}
                            className={`${styles.message} ${msg.sender === loggedInUser?._id ? styles.sent : styles.received}`}
                            data-message-id={msg._id}
                        >
                            <span>{msg.text}</span>
                            <span className={styles.messageStatus}>
                                {getMessageStatus(msg) === "sent" ? (
                                    <span className={styles.singleTick}>✓</span>
                                ) : getMessageStatus(msg) === "seen" ? (
                                    <span className={styles.doubleTick}>✓✓</span>
                                ) : null}
                            </span>
                        </div>
                    ))
                )}
            </div>

            <div className={styles.chatInputArea}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    className={styles.chatInput}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    ref={messageInputRef}
                />

                <span 
                    className={styles.emojiButton} 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    <BsEmojiSmile />
                </span>

                <label htmlFor="imageUpload" className={styles.imageUploadButton}>
                    <BsImage />
                </label>
                <input 
                    type="file" 
                    id="imageUpload" 
                    style={{ display: 'none' }} 
                    onChange={handleImageUpload}
                />

                <span
                    className={styles.sendButton}
                    onClick={sendMessage}
                    disabled={!selectedFriend?._id || !loggedInUser?._id}
                >
                    <IoSend />
                </span>

                {showEmojiPicker && (
                    <div style={{ position: 'absolute', bottom: '50px', left: 0 }}>
                        <Picker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;