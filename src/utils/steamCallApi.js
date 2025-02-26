// steamCallApi.js
import * as Steamworks from "@stream-io/video-react-sdk";

let steamClient = null;
const apiKey = "your-api-key";
const userId = "user-id";
const token = "authentication-token";

export const initSteamCall = async ({ token, isInitiator, enableVideo, socket, selectedFriend, incomingCall, loggedInUser, callId }) => {  // Add socket and other necessary parameters
    if (!steamClient) {
        steamClient = new Steamworks.Client({ appId: 1368591 });
    }

    const user = steamClient.user;
    const userId = user.steamId; // Or however you get the Steam ID

    const peerConnection = new RTCPeerConnection();

    let localStream;
    try {
        if (enableVideo) {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        } else {
            localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    } catch (error) {
        console.error("Error getting media stream:", error);
        alert("Unable to access media devices. Please check your permissions.");

        throw error; // Re-throw to handle in ChatWindow
    }


    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("iceCandidate", {
                candidate: event.candidate,
                target: isInitiator ? selectedFriend._id : incomingCall.callerId,
                sender: userId,
                callId: callId // Use the provided callId
            });
        }
    };

    peerConnection.ontrack = (event) => {
        console.log("Received remote stream");
        // ... (Your existing ontrack logic) ...
    };

    if (isInitiator) {
        try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            socket.emit("callOffer", { offer, target: selectedFriend._id, sender: userId, callId: callId });
        } catch (error) {
            console.error("Error creating/sending offer:", error);
            alert("Failed to create or send the call offer. Please try again.");

            throw error;
        }
    }

    return { localStream, peerConnection };
};

export const getSteamRTCToken = async (callId) => {
    // Replace with your actual token retrieval logic
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6ImFuYWx5dGljcyIsImFjdGlvbiI6IioiLCJ1c2VyX2lkIjoiKiJ9.j5LBjWOXAy3wVX7RGAhXip5G3dP41862LXZp7x6iVl0" + callId });
        }, 500);
    });
};
