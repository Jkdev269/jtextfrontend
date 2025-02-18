import { useState, useEffect, useRef, useContext} from "react";
import axios from "axios";
import { io } from "socket.io-client";
import styles from "../Styles/ChatWindowStyle.module.css";
import { AuthContext } from "../context/AuthContext";
import { BsTelephone, BsCameraVideo } from "react-icons/bs";
import { IoSend } from 'react-icons/io5';
import { BsEmojiSmile, BsImage } from 'react-icons/bs'; // Import emoji and image icons
import Picker from 'emoji-picker-react'; // Import emoji picker

const socket = io("http://localhost:8081", { withCredentials: true });

const ChatWindow = ({ selectedFriend, setSelectedFriend }) => {
    const { user: loggedInUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageListRef = useRef(null);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for emoji picker
    //const [chosenEmoji, setChosenEmoji] = useState(null); // State for chosen emoji
    const messageInputRef = useRef(null);


    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedFriend || !loggedInUser) {
                setMessages([]);
                setLoadingMessages(false); // Set loading to false even if no friend/user
                return;
            }

            setLoadingMessages(true);
            try {
                const response = await axios.get(
                    `http://localhost:8081/api/private-messages/${selectedFriend.username}/${loggedInUser.username}`,
                    { withCredentials: true }
                );
                setMessages(response.data);
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
            socket.emit("leaveRoom", loggedInUser._id);
            socket.emit("leaveRoom", selectedFriend._id);
        };
    }, [selectedFriend, loggedInUser]);

    

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        if (!selectedFriend?._id || !loggedInUser?._id || !selectedFriend?.username || !loggedInUser?.username) {
            console.error("❌ Missing user data:", { selectedFriend, loggedInUser });
            return;
        }

        try {
            const currentMessage = message; 
            const response = await axios.post(
                "http://localhost:8081/api/private-messages/send",
                {
                    fromUsername: loggedInUser.username,
                    toUsername: selectedFriend.username,
                    text: currentMessage.trim(),
                },
                { withCredentials: true }
            );

            setMessage(""); // Clear input field immediately

            // The rest of the handling is now done through Socket.io
            // Remove optimistic update and state manipulation here
            console.log("Message sent successfully (Axios)", response.data);
            if (messageInputRef.current) {
                messageInputRef.current.focus(); // Refocus on the input field
            }

        } catch (error) {
            console.error("❌ Error sending message:", error);
            if (error.response) {
                console.error("Server responded with:", error.response.data);
            }
        }
    };
    const handleEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
        setShowEmojiPicker(false);

        if (messageInputRef.current) {
            messageInputRef.current.focus(); // Refocus on the input field
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Here you would typically send the image data to your backend
                // For this example, we'll just log it to the console
                console.log("Image data:", reader.result);
                // In a real application, you would include this image data in your
                // message payload when sending it to the server.
            }
            reader.readAsDataURL(file); // Or readAsBinaryString if needed
        }
    };

    useEffect(() => {
        const handleReceiveMessage = (newMessage) => {
            if (!newMessage?.text?.trim()) {
                console.warn("⚠️ Received an empty message:", newMessage);
                return;
            }
            console.log("📩 Received new message:", newMessage);
            setMessages((prev) => [...prev, newMessage]); // Only update state here
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, []);

    return (
        <div className={styles.chatContainer}>
            {/* ... (rest of your JSX - header, message area, input) */}
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

                <h2 className={styles.chatFriendName}>{selectedFriend?.username}</h2>
<div className={styles.callIcons}> {/* Add a container for styling */}
                    <span className={styles.callButton} onClick={() => handleCall()}> {/* Call button */}
                        <BsTelephone /> {/* Use a call icon */}
                    </span>
                    <span className={styles.videoCallButton} onClick={() => handleVideoCall()}> {/* Video call button */}
                        <BsCameraVideo /> {/* Use a video call icon */}
                    </span>
                </div>

            </div>



            {/* 🟢 Messages Section */}

            <div className={styles.messageArea} ref={messageListRef}>

                {loadingMessages ? (

                    <p className={styles.messagePlaceholder}>Loading messages...</p>

                ) : messages.length === 0 ? (

                    <p className={styles.messagePlaceholder}>

                        Start your conversation with {selectedFriend?.username}...

                    </p>

                ) : (

                    messages.map((msg, index) => (

                        <div

                            key={msg._id || index}

                            className={`${styles.message} ${

                                msg.sender === loggedInUser?._id ? styles.sent : styles.received

                            }`}

                        >

                            {msg.text?.trim() ? <p>{msg.text}</p> : <p>🚨 Error: Message is empty!</p>}

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

                <span className={styles.emojiButton} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <BsEmojiSmile />
                </span>

                <label htmlFor="imageUpload" className={styles.imageUploadButton}> {/* Make label act as button */}
                    <BsImage />
                </label>
                <input type="file" id="imageUpload" style={{ display: 'none' }} onChange={handleImageUpload} />

                <span
                    className={styles.sendButton}
                    onClick={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}
                    disabled={!selectedFriend?._id || !loggedInUser?._id || !selectedFriend?.username || !loggedInUser?.username}
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