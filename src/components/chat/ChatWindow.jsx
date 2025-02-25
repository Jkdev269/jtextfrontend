import { useState, useEffect, useRef, useContext, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ImageModal from './ImageModal';
import { debounce } from '../../utils/debounce';

// Create a socket instance at module level (outside components)
// This ensures it's not recreated on every render
const socket = io("http://localhost:8081", { withCredentials: true });

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
    const [selectedImageModal, setSelectedImageModal] = useState(null);
    const [forceUpdate, setForceUpdate] = useState(0); // New state for forcing re-renders

    // Emit user online status when component mounts
    useEffect(() => {
        if (loggedInUser?._id) {
            // Emit userOnline event when component mounts
            socket.emit("userOnline", loggedInUser._id);
            
            // Set up cleanup function to emit userOffline when component unmounts
            return () => {
                socket.emit("userOffline", loggedInUser._id);
            };
        }
    }, [loggedInUser]);

    // Listen for online/offline status changes
    useEffect(() => {
        const handleUserOnline = (userId) => {
            console.log("User online:", userId);
            setOnlineUsers(prev => {
                if (!prev.includes(userId)) {
                    return [...prev, userId];
                }
                return prev;
            });
        };

        const handleUserOffline = (userId) => {
            console.log("User offline:", userId);
            setOnlineUsers(prev => prev.filter(id => id !== userId));
        };

        // Get initial online users
        socket.emit("getOnlineUsers");

        // Set up socket event listeners
        socket.on("userOnline", handleUserOnline);
        socket.on("userOffline", handleUserOffline);
        socket.on("onlineUsers", (users) => {
            console.log("Online users:", users);
            setOnlineUsers(users);
        });

        // Clean up socket event listeners
        return () => {
            socket.off("userOnline", handleUserOnline);
            socket.off("userOffline", handleUserOffline);
            socket.off("onlineUsers");
        };
    }, []);

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
            // Find the message to get the sender ID
            const message = messages.find(msg => msg._id === messageId);
            if (!message) return;
    
            seenMessagesRef.current.add(messageId);
    
            // Optimistically update the UI
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg._id === messageId ? { ...msg, status: 'seen' } : msg
                )
            );
    
            setMessageStatus(prev => {
                const updated = { ...prev, [messageId]: 'seen' };
                return updated;
            });
    
            setForceUpdate(prev => prev + 1);
    
            const response = await axios.put(
                `http://localhost:8081/api/private-messages/seen/${messageId}`,
                { userId: loggedInUser._id },
                { withCredentials: true }
            );
    
            if (response.status === 200) {
                // Include sender ID so server knows who to notify
                socket.emit("messageSeen", {
                    messageId,
                    viewerId: loggedInUser._id,
                    senderId: message.sender
                });
                console.log("Marked message as seen:", messageId, "sender:", message.sender);
            } else {
                // Revert the optimistic update on error
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg._id === messageId ? { ...msg, status: 'sent' } : msg
                    )
                );
    
                setMessageStatus(prev => {
                    const updated = { ...prev };
                    delete updated[messageId];
                    return updated;
                });
                setForceUpdate(prev => prev + 1);
            }
        } catch (error) {
            console.error("❌ Error marking message as seen:", error);
            seenMessagesRef.current.delete(messageId);
            // Revert the optimistic update on error
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg._id === messageId ? { ...msg, status: 'sent' } : msg
                )
            );
    
            setMessageStatus(prev => {
                const updated = { ...prev };
                delete updated[messageId];
                return updated;
            });
            setForceUpdate(prev => prev + 1);
        }
    }, [loggedInUser, messages]);

    const markVisibleMessagesSeen = useCallback(() => {
        if (!messageListRef.current || !loggedInUser) return;
    
        // Select only received messages (from the other user)
        const receivedMessages = Array.from(messageListRef.current.querySelectorAll('[data-message-id]'))
            .filter(el => el.classList.contains('received-message'));
        
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
                    imageUrl: msg.imageUrl ? msg.imageUrl : null,
                    // Ensure timestamp is a valid date string
                    timestamp: msg.timestamp || new Date().toISOString()
                }));
                
                setMessages(processedMessages);
                
                // Initialize message status state
                const initialMessageStatus = {};
                processedMessages.forEach(msg => {
                    if (msg.sender === loggedInUser._id) {
                        initialMessageStatus[msg._id] = msg.status || 'sent';
                    }
                });
                setMessageStatus(initialMessageStatus);
                
                seenMessagesRef.current.clear();
                
                // Join the room for real-time updates
                if (loggedInUser._id && selectedFriend._id) {
                    socket.emit("joinRoom", loggedInUser._id);
                    socket.emit("joinRoom", selectedFriend._id);
                }
                
                // Scroll to bottom after messages are loaded
                setTimeout(scrollToBottom, 0);
            } catch (error) {
                console.error("❌ Error fetching messages:", error.response ? error.response.data : error.message);

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

    // Message socket events effect
    useEffect(() => {
        const handleReceiveMessage = (newMessage) => {
            console.log("Received new message:", newMessage);
            
            // Fix: Validate message has content before processing
            if (!newMessage || (!newMessage.text && !newMessage.imageUrl)) {
                console.log("Empty message received, ignoring:", newMessage);
                return;
            }
            
            // Fix: Ensure timestamp is valid
            if (!newMessage.timestamp || newMessage.timestamp === 'Invalid Date') {
                newMessage.timestamp = new Date().toISOString();
            }
            
            setMessages(prev => {
                // Check if message already exists to prevent duplicates
                const messageExists = prev.some(msg => msg._id === newMessage._id);
                if (messageExists) return prev;
                
                return [...prev, newMessage];
            });
            
            // Scroll to bottom when new message arrives
            setTimeout(scrollToBottom, 0);
            
            // If this message is received by the current user, mark it as seen
            if (newMessage.receiver === loggedInUser?._id && 
                newMessage.sender === selectedFriend?._id) {
                markMessageAsSeen(newMessage._id);
            }
        };

        const handleMessageSeen = (data) => {
            const { messageId, viewerId } = data;
            console.log("Message seen event received:", data);
        
            // Only update if the viewer is the selected friend
            if (viewerId === selectedFriend?._id) {
                console.log("Updating message status to seen:", messageId);
        
                // Update both messages array and messageStatus object
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg._id === messageId ? { ...msg, status: 'seen' } : msg
                    )
                );
        
                setMessageStatus(prev => {
                    // Create a new object to ensure state change is detected
                    const updated = { ...prev, [messageId]: 'seen' };
                    console.log("Updated messageStatus:", updated);
                    return updated;
                });
        
                // Explicitly force a re-render to ensure seen status updates
                setForceUpdate(prev => prev + 1);
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
    }, [selectedFriend, loggedInUser, markMessageAsSeen])
    ;

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
            
            // Fix: Ensure timestamp is valid and exists
            if (!newMessage.timestamp || newMessage.timestamp === 'Invalid Date') {
                newMessage.timestamp = new Date().toISOString();
            }
            
            // Fix: Only emit if message has content
            if (newMessage.text || newMessage.imageUrl) {
                // Update messages state immediately with initial status
                const messageWithStatus = {
                    ...newMessage,
                    status: 'sent'
                };
                
                setMessages(prev => [...prev, messageWithStatus]);
                
                // Update message status state
                setMessageStatus(prev => ({ ...prev, [newMessage._id]: "sent" }));
                
                // Emit socket event - make sure to include timestamp
                socket.emit("sendMessage", {
                    ...newMessage,
                    timestamp: newMessage.timestamp,
                    status: 'sent'
                });
                console.log("Sent message:", messageWithStatus);
            } else {
                console.warn("Attempted to send empty message, ignoring");
            }
            
            // Clear input fields
            setMessage("");
            setSelectedImage(null);
            setImagePreview(null);
            
            // Scroll to bottom
            setTimeout(scrollToBottom, 0);

            if (messageInputRef.current) {
                messageInputRef.current.focus();
            }
        } catch (error) {
                console.error("❌ Error sending message:", error.response ? error.response.data : error.message);

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

    // Enhanced getMessageStatus function for more reliable status checks
    const getMessageStatus = useCallback((message) => {
        // Only show status for messages sent by the current user
        if (message.sender !== loggedInUser?._id) return null;
        
        // First check the messageStatus state object (more up-to-date)
        const statusFromState = messageStatus[message._id];
        if (statusFromState) {
            return statusFromState;
        }
        
        // Fall back to message.status if not in state
        return message.status || "sent";
    }, [loggedInUser, messageStatus]);

    const isUserOnline = useCallback((userId) => 
        userId ? onlineUsers.includes(userId) : false, 
        [onlineUsers]
    );

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <ChatHeader 
                selectedFriend={selectedFriend}
                setSelectedFriend={setSelectedFriend}
                isUserOnline={isUserOnline}
            />
            
            <MessageList 
                messageListRef={messageListRef}
                loadingMessages={loadingMessages}
                messages={messages}
                selectedFriend={selectedFriend}
                loggedInUser={loggedInUser}
                getMessageStatus={getMessageStatus}
                setSelectedImageModal={setSelectedImageModal}
                messageStatus={messageStatus} // Pass the messageStatus state
                forceUpdate={forceUpdate} // Add forceUpdate to trigger re-renders
            />
            
            <ChatInput 
                message={message}
                setMessage={setMessage}
                imagePreview={imagePreview}
                removeSelectedImage={removeSelectedImage}
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
                handleEmojiClick={handleEmojiClick}
                fileInputRef={fileInputRef}
                handleImageUpload={handleImageUpload}
                messageInputRef={messageInputRef}
                sendMessage={sendMessage}
                selectedFriend={selectedFriend}
                loggedInUser={loggedInUser}
            />
            
            <ImageModal 
                selectedImageModal={selectedImageModal}
                setSelectedImageModal={setSelectedImageModal}
            />
        </div>
    );
};

export default ChatWindow;
