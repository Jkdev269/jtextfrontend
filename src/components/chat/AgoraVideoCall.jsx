import React, { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

// Agora Configuration
const appId = import.meta.env.VITE_AGORA_APP_ID; // Replace with your actual Agora App ID


const AgoraVideoCall = ({ selectedFriend, loggedInUser, onEndCall }) => {
    const [localTracks, setLocalTracks] = useState([]);
    const [remoteTracks, setRemoteTracks] = useState({});
    const [joined, setJoined] = useState(false);
    const [trackState, setTrackState] = useState({ video: true, audio: true });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [callEnded, setCallEnded] = useState(false);
    
    const clientRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    // Generate a unique channel name based on user IDs (sorted to ensure the same name for both users)
    const channelName = [selectedFriend._id, loggedInUser._id].sort().join("-");
    
    // Convert MongoDB ObjectId to a valid numeric UID (Agora requires numeric UIDs)
    const localUid = parseInt(loggedInUser._id.substring(0, 8), 16) % 100000000;

    // Function to play the local video track
    const playLocalVideo = () => {
        if (localTracks[1] && localVideoRef.current && !callEnded) {
            try {
                console.log("Playing local video track");
                localTracks[1].play(localVideoRef.current);
            } catch (err) {
                console.error("Error playing local video:", err);
            }
        }
    };

    // Function to disable tracks before cleaning up
    const disableTracks = async () => {
        console.log("Disabling tracks before cleanup");
        
        // Disable local tracks first
        if (localTracks.length > 0) {
            try {
                // Disable audio track
                if (localTracks[0] && trackState.audio) {
                    await localTracks[0].setEnabled(false);
                    setTrackState(prev => ({ ...prev, audio: false }));
                }
                
                // Disable video track
                if (localTracks[1] && trackState.video) {
                    await localTracks[1].setEnabled(false);
                    setTrackState(prev => ({ ...prev, video: false }));
                }
                
                // Publish track state changes to remote users
                if (clientRef.current && joined) {
                    console.log("Publishing track state changes to remote users");
                }
            } catch (err) {
                console.error("Error disabling local tracks:", err);
            }
        }
        
        // Signal to the remote peer that call is ending
        try {
            if (clientRef.current && joined) {
                // Unpublish all local tracks to signal call end
                if (localTracks.length > 0) {
                    await clientRef.current.unpublish(localTracks);
                    console.log("Unpublished local tracks to signal call end");
                }
            }
        } catch (err) {
            console.error("Error signaling call end to remote peer:", err);
        }
    };

    // Function to clean up all tracks and resources
    const cleanupResources = async () => {
        console.log("Cleaning up resources");
        
        // First disable all tracks to signal to the other user
        await disableTracks();
        
        // Stop and close all local tracks
        localTracks.forEach(track => {
            if (track) {
                console.log("Stopping local track:", track.trackMediaType);
                track.stop();
                track.close();
            }
        });
        
        // Clear local tracks state
        setLocalTracks([]);
        
        // Leave the channel
        if (clientRef.current && joined) {
            try {
                await clientRef.current.leave();
                console.log("Left channel successfully");
                setJoined(false);
            } catch (err) {
                console.error("Failed to leave channel:", err);
            }
        }
        
        setCallEnded(true);
    };

    useEffect(() => {
        // Initialize Agora client
        if (!clientRef.current) {
            clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        }

        const client = clientRef.current;

        // Setup event handlers for remote users
        const handleUserPublished = async (user, mediaType) => {
            try {
                await client.subscribe(user, mediaType);
                console.log("Subscribed to remote user:", user.uid, mediaType);

                if (mediaType === "video") {
                    setRemoteTracks(prev => ({
                        ...prev,
                        [user.uid]: {
                            ...prev[user.uid],
                            video: user.videoTrack
                        }
                    }));
                    
                    // Play remote video with a delay to ensure DOM is ready
                    setTimeout(() => {
                        if (user.videoTrack && remoteVideoRef.current) {
                            user.videoTrack.play(remoteVideoRef.current);
                        }
                    }, 100);
                }

                if (mediaType === "audio") {
                    setRemoteTracks(prev => ({
                        ...prev,
                        [user.uid]: {
                            ...prev[user.uid],
                            audio: user.audioTrack
                        }
                    }));
                    
                    if (user.audioTrack) {
                        user.audioTrack.play();
                    }
                }
            } catch (error) {
                console.error("Error subscribing to remote tracks:", error);
            }
        };

        const handleUserUnpublished = (user, mediaType) => {
            console.log("User unpublished:", user.uid, mediaType);
            
            // If the user unpublishes all tracks without leaving, it might be a signal that they're ending the call
            const remoteUser = remoteTracks[user.uid];
            if (mediaType === "video" && remoteUser?.video) {
                remoteUser.video.stop();
                setRemoteTracks(prev => {
                    const updated = { ...prev };
                    if (updated[user.uid]) {
                        delete updated[user.uid].video;
                    }
                    return updated;
                });
                
                // Check if all tracks are unpublished
                if (!remoteTracks[user.uid]?.audio) {
                    // This might be a signal that the other user is ending the call
                    // Start our own cleanup after a short delay
                    setTimeout(() => {
                        if (!callEnded) {
                            console.log("Remote user unpublished all tracks, initiating cleanup");
                            cleanupResources();
                            
                            // Call the parent component's callback to return to chat
                            if (onEndCall) {
                                onEndCall();
                            }
                        }
                    }, 500);
                }
            }
            
            if (mediaType === "audio" && remoteUser?.audio) {
                remoteUser.audio.stop();
                setRemoteTracks(prev => {
                    const updated = { ...prev };
                    if (updated[user.uid]) {
                        delete updated[user.uid].audio;
                    }
                    return updated;
                });
                
                // Check if all tracks are unpublished
                if (!remoteTracks[user.uid]?.video) {
                    // This might be a signal that the other user is ending the call
                    // Start our own cleanup after a short delay
                    setTimeout(() => {
                        if (!callEnded) {
                            console.log("Remote user unpublished all tracks, initiating cleanup");
                            cleanupResources();
                            
                            // Call the parent component's callback to return to chat
                            if (onEndCall) {
                                onEndCall();
                            }
                        }
                    }, 500);
                }
            }
        };

        const handleUserLeft = async (user) => {
            console.log("User left:", user.uid);
            
            // Clean up tracks when user leaves
            if (remoteTracks[user.uid]) {
                if (remoteTracks[user.uid].audio) remoteTracks[user.uid].audio.stop();
                if (remoteTracks[user.uid].video) remoteTracks[user.uid].video.stop();
                
                setRemoteTracks(prev => {
                    const updated = { ...prev };
                    delete updated[user.uid];
                    return updated;
                });
            }
            
            // Auto end call when the other user leaves
            if (!callEnded) {
                await cleanupResources();
                
                // Call the parent component's callback to return to chat
                if (onEndCall) {
                    onEndCall();
                }
            }
        };

        // Handle connection state changes
        const handleConnectionStateChange = (curState, prevState) => {
            console.log("Connection state changed from", prevState, "to", curState);
            
            if (curState === "DISCONNECTED") {
                // Clean up if disconnected and not already cleaned up
                if (!callEnded) {
                    console.log("Disconnected from server, cleaning up resources");
                    cleanupResources();
                    
                    // Call the parent component's callback to return to chat
                    if (onEndCall) {
                        onEndCall();
                    }
                }
            }
        };

        // Register event handlers
        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);
        client.on("user-left", handleUserLeft);
        client.on("connection-state-change", handleConnectionStateChange);

        // Join channel and create local streams when component mounts
        const joinChannel = async () => {
            if (callEnded) return;
            
            try {
                setLoading(true);
                setError(null);
                
                console.log("Joining channel:", channelName, "with UID:", localUid);
                
                // Join the channel first to check connection
                await client.join(appId, channelName, null, localUid);
                console.log("Successfully joined channel");
                
                // Create microphone and camera tracks
                const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
                console.log("Created local tracks");
                
                // Publish local tracks to channel
                await client.publish([microphoneTrack, cameraTrack]);
                console.log("Published local tracks to channel");
                
                // Save tracks for later use
                setLocalTracks([microphoneTrack, cameraTrack]);
                
                setJoined(true);
                setLoading(false);
                
                // Wait for DOM to be ready before playing local video
                setTimeout(() => {
                    if (cameraTrack && localVideoRef.current) {
                        try {
                            cameraTrack.play(localVideoRef.current);
                            console.log("Local video track played successfully");
                        } catch (err) {
                            console.error("Failed to play local video:", err);
                        }
                    }
                }, 100);
            } catch (error) {
                console.error("Error joining channel:", error);
                
                // Set specific error message based on the error type
                if (error.code === 'CAN_NOT_GET_GATEWAY_SERVER') {
                    setError("Unable to connect to Agora servers. Please check your App ID and internet connection.");
                } else if (error.code === 'INVALID_OPERATION') {
                    setError("Invalid operation. You might be trying to join a channel you're already in.");
                } else if (error.type === 'PERMISSION_DENIED') {
                    setError("Camera or microphone permission denied. Please allow access to your media devices.");
                } else {
                    setError(`Error: ${error.message || 'Unknown error occurred'}`);
                }
                
                setLoading(false);
            }
        };

        if (!callEnded) {
            joinChannel();
        }

        // Clean up when component unmounts
        return () => {
            // Unregister event handlers
            client.off("user-published", handleUserPublished);
            client.off("user-unpublished", handleUserUnpublished);
            client.off("user-left", handleUserLeft);
            client.off("connection-state-change", handleConnectionStateChange);
            
            // Clean up all resources
            cleanupResources();
        };
    }, [callEnded]);

    // Effect for handling local video playback
    useEffect(() => {
        if (localTracks.length > 1 && localVideoRef.current && !loading && joined && !callEnded) {
            playLocalVideo();
        }
    }, [localTracks, loading, joined, callEnded]);

    // Effect for re-rendering the video when the container refs change
    useEffect(() => {
        if (!loading && localVideoRef.current && localTracks.length > 1 && !callEnded) {
            playLocalVideo();
        }
    }, [localVideoRef.current, callEnded]);

    const toggleMedia = async (type) => {
        if (type === "audio" && localTracks[0]) {
            await localTracks[0].setEnabled(!trackState.audio);
            setTrackState(prev => ({ ...prev, audio: !prev.audio }));
        } else if (type === "video" && localTracks[1]) {
            await localTracks[1].setEnabled(!trackState.video);
            setTrackState(prev => ({ ...prev, video: !prev.video }));
        }
    };

    const handleEndCall = async () => {
        // Signal remote user to disable their tracks
        if (clientRef.current && joined) {
            try {
                // Send a message to the remote user indicating the call is ending
                await clientRef.current.sendMessage({
                    text: "end_call"
                });
                console.log("Signaled remote user to end call");
                // Optionally, you can also handle the cleanup for the remote user here
                // For example, you might want to call cleanupResources() for the remote user

            } catch (err) {
                console.error("Error signaling remote user:", err);
            }
        }

        await cleanupResources();
        // Optionally, you can add a log here to confirm cleanup has been initiated
        console.log("Cleanup resources after ending the call");

        
        // Call the parent component's callback
        if (onEndCall) {
            onEndCall();
        }
    };

    const retryConnection = () => {
        // Reset states
        setError(null);
        setLoading(true);
        setCallEnded(false);
        
        // Clean up any existing tracks
        localTracks.forEach(track => {
            if (track) {
                track.stop();
                track.close();
            }
        });
        setLocalTracks([]);
        
        // Leave channel if already joined
        if (clientRef.current && joined) {
            clientRef.current.leave().catch(console.error);
        }
        
        // Recreate client instance
        clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        
        // Retry joining after a short delay
        setTimeout(() => {
            // The useEffect will run again and retry the connection
            setJoined(false);
        }, 1000);
    };

    // Get the list of remote user UIDs
    const remoteUserIds = Object.keys(remoteTracks);
    const hasRemoteUser = remoteUserIds.length > 0;

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gray-800 p-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${joined ? 'bg-green-500' : error ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                    {error ? 'Connection Error' : joined ? `Call with ${selectedFriend.username}` : 'Connecting...'}
                </h2>
                <div className="text-sm text-gray-400">
                    {error ? 'Failed to connect' : hasRemoteUser ? 'Connected' : 'Waiting for participant...'}
                </div>
            </div>

            {/* Video area */}
            <div className="flex-1 relative bg-black">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                        <div className="bg-red-500 text-white p-4 rounded-lg mb-4 max-w-lg text-center">
                            <p className="font-semibold mb-2">Connection Error</p>
                            <p>{error}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button 
                                onClick={retryConnection}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                            >
                                Retry Connection
                            </button>
                            <button 
                                onClick={handleEndCall}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
                            >
                                Back to Chat
                            </button>
                        </div>
                        <div className="mt-4 text-sm text-gray-400 max-w-lg text-center">
                            <p>Tip: Make sure your Agora App ID is valid and your internet connection is stable.</p>
                        </div>
                    </div>
                ) : callEnded ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <p className="mb-4">Call has ended</p>
                            <button 
                                onClick={onEndCall}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                            >
                                Return to Chat
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Main remote video when remote user is present */}
                        {hasRemoteUser && (
                            <div 
                                ref={remoteVideoRef}
                                className="absolute inset-0 w-full h-full"
                            ></div>
                        )}
                        
                        {/* Main local video when no remote user */}
                        {!hasRemoteUser && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div 
                                    ref={localVideoRef} 
                                    className={`w-full h-full ${trackState.video ? 'block' : 'hidden'}`}
                                ></div>
                                {!trackState.video && (
                                    <div className="flex flex-col items-center">
                                        <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center mb-2">
                                            {loggedInUser.username?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <p>Camera Off</p>
                                    </div>
                                )}
                                
                                {/* Show waiting message when no remote user */}
                                <div className="absolute bottom-4 left-0 right-0 text-center bg-black bg-opacity-50 py-2">
                                    <p>Waiting for {selectedFriend.username} to join...</p>
                                </div>
                            </div>
                        )}
                        
                        {/* Small local video (picture-in-picture) when remote user present */}
                        {hasRemoteUser && (
                            <div className="absolute right-4 bottom-4 w-1/4 h-1/4 max-h-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                <div 
                                    ref={localVideoRef} 
                                    className={`w-full h-full ${trackState.video ? 'block' : 'hidden'}`}
                                ></div>
                                {!trackState.video && (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
                                                {loggedInUser.username?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                            <p className="text-xs mt-1">Camera Off</p>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute bottom-1 left-1 text-xs bg-black bg-opacity-50 px-1 py-0.5 rounded">
                                    You
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Controls */}
            {!error && !callEnded && (
                <div className="bg-gray-800 p-4 flex items-center justify-center space-x-4">
                    <button
                        onClick={() => toggleMedia("audio")}
                        disabled={loading || !joined}
                        className={`p-4 rounded-full ${trackState.audio ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'} transition-colors ${(loading || !joined) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {trackState.audio ? 'Mute' : 'Unmute'}
                    </button>
                    <button
                        onClick={() => toggleMedia("video")}
                        disabled={loading || !joined}
                        className={`p-4 rounded-full ${trackState.video ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'} transition-colors ${(loading || !joined) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {trackState.video ? 'Stop Video' : 'Start Video'}
                    </button>
                    <button 
                        onClick={handleEndCall}
                        className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                    >
                        End Call
                    </button>
                </div>
            )}
        </div>
    );
};

export default AgoraVideoCall;
