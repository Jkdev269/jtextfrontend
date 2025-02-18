import { useState, useEffect } from "react";
import { acceptFriendRequest, rejectFriendRequest, getUserProfile } from "../api/api";
import styles from "../Styles/FriendRequestsStyle.module.css"

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const profileData = await getUserProfile();
        setRequests(profileData?.friendRequests || []);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
        setRequests([]);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    setLoading(requestId);
    try {
      await acceptFriendRequest(requestId);
      setRequests((prevRequests) => prevRequests.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
    setLoading(null);
  };

  const handleReject = async (requestId) => {
    setLoading(requestId);
    try {
      await rejectFriendRequest(requestId);
      setRequests((prevRequests) => prevRequests.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
    setLoading(null);
  };

  return (
    <div className={styles.friendRequestContainer}>
      <h2 className={styles.friendRequestHeading}>🤝 Friend Requests</h2>

      {requests.length === 0 ? (
        <p className={styles.noRequests}>No friend requests available.</p>
      ) : (
        <ul className={styles.requestList}>
          {requests.map((request) => (
            <li key={request.id} className={styles.requestItem}>
              <div className={styles.requestSender}>
                <img
                  src={request.senderProfileImage} // Replace with your image source
                  alt="Profile"
                  className={styles.senderAvatar}
                />
                <div className={styles.senderInfo}>
                  <p className={styles.senderName}>{request.senderName}</p>
                  <p className={styles.senderUsername}>@{request.senderUsername}</p>
                </div>
              </div>

              <div className={styles.requestButtons}>
                <button
                  className={`${styles.acceptButton} ${
                    loading === request.id ? styles.loadingButton : ""
                  }`}
                  onClick={() => handleAccept(request.id)}
                  disabled={loading === request.id}
                >
                  {loading === request.id ? "Accepting..." : "Accept"}
                </button>
                <button
                  className={`${styles.rejectButton} ${
                    loading === request.id ? styles.loadingButton : ""
                  }`}
                  onClick={() => handleReject(request.id)}
                  disabled={loading === request.id}
                >
                  {loading === request.id ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequests;