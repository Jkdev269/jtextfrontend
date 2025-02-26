import React, { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { PhoneOff, Mic, MicOff } from 'lucide-react';

const AgoraVoiceCall = ({ selectedFriend, loggedInUser, onEndCall }) => {
    const [client, setClient] = useState(null);
    const [localAudioTrack, setLocalAudioTrack] = useState(null);
    const [remoteAudioTrack, setRemoteAudioTrack] = useState(null);
    const [joined, setJoined] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [callConnected, setCallConnected] = useState(false);
    const timerRef = useRef(null);
    
    const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
    // Generate a random channel name based on user IDs
    const channelName = [loggedInUser._id, selectedFriend._id].sort().join('-');
    
    useEffect(() => {
        // Initialize Agora client
        const rtcClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        setClient(rtcClient);
        
        // Join the channel when component mounts
        joinChannel(rtcClient);
        
        // Clean up when component unmounts
        return () => {
            leaveChannel();
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);
    
    // Start timer only when call is connected (both users joined)
    useEffect(() => {
        if (callConnected) {
            // Reset timer when call connects
            setCallDuration(0);
            
            // Set up timer for call duration
            timerRef.current = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
            
            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }
    }, [callConnected]);
    
    const joinChannel = async (rtcClient) => {
        try {
            // You need to have a function to generate a token from your server
            // For testing, you can use the App ID with a temporary token from Agora Console
            const token = null; // Replace with your token generation or pass as prop
            const uid = loggedInUser._id;
            
            // Join the channel
            await rtcClient.join(APP_ID, channelName, token, uid);
            console.log("Successfully joined the channel");
            
            // Create and publish audio track
            const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            await rtcClient.publish([audioTrack]);
            setLocalAudioTrack(audioTrack);
            setJoined(true);
            
            // Set up event listeners for remote users
            rtcClient.on("user-published", async (remoteUser, mediaType) => {
                await rtcClient.subscribe(remoteUser, mediaType);
                
                if (mediaType === 'audio') {
                    const remoteAudio = remoteUser.audioTrack;
                    remoteAudio.play();
                    setRemoteAudioTrack(remoteAudio);
                    // Call is connected when remote user joins with audio
                    setCallConnected(true);
                    console.log("Call connected - remote user joined with audio");
                }
            });
            
            rtcClient.on("user-unpublished", (remoteUser, mediaType) => {
                if (mediaType === 'audio') {
                    if (remoteUser.audioTrack) {
                        remoteUser.audioTrack.stop();
                    }
                    setRemoteAudioTrack(null);
                    // Call is disconnected when remote user leaves
                    setCallConnected(false);
                    console.log("Remote user unpublished audio");
                }
            });
            
            rtcClient.on("user-left", (user) => {
                console.log("Remote user left the channel");
                setCallConnected(false);
                // Optionally end the call automatically when the other person leaves
                // setTimeout(() => onEndCall(), 1000);
            });
        } catch (error) {
            console.error("Error joining channel:", error);
        }
    };
    
    const leaveChannel = async () => {
        try {
            // Stop timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            
            // Stop and close local tracks
            if (localAudioTrack) {
                localAudioTrack.stop();
                localAudioTrack.close();
            }
            
            // Leave the channel
            if (client) {
                await client.leave();
                console.log("Left the channel successfully");
            }
            
            // Clear state
            setLocalAudioTrack(null);
            setRemoteAudioTrack(null);
            setJoined(false);
            setCallConnected(false);
            
            // Call the parent component's onEndCall callback
            onEndCall();
        } catch (error) {
            console.error("Error leaving channel:", error);
        }
    };
    
    const toggleMute = () => {
        if (localAudioTrack) {
            if (isMuted) {
                localAudioTrack.setEnabled(true);
            } else {
                localAudioTrack.setEnabled(false);
            }
            setIsMuted(!isMuted);
        }
    };
    
    // Format call duration to mm:ss
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-900 p-4">
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                        {selectedFriend.profilePicture ? (
                            <img 
                                src={selectedFriend.profilePicture} 
                                alt={selectedFriend.username} 
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <div className="text-4xl font-bold text-white">
                                {selectedFriend.username.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    
                    <h2 className="text-xl font-semibold text-white mb-1">
                        {selectedFriend.username}
                    </h2>
                    
                    <p className="text-gray-400 mb-6">
                        {callConnected 
                            ? 'Connected' 
                            : joined 
                                ? 'Waiting for other party to join...' 
                                : 'Connecting...'}
                    </p>
                    
                    <p className="text-xl font-medium mb-8">
                        {callConnected ? formatDuration(callDuration) : '00:00'}
                    </p>
                    
                    <div className="flex justify-center space-x-6">
                        <button 
                            onClick={toggleMute}
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                isMuted ? 'bg-gray-600' : 'bg-gray-700'
                            }`}
                            disabled={!callConnected}
                        >
                            {isMuted ? (
                                <MicOff size={24} className="text-red-500" />
                            ) : (
                                <Mic size={24} className={`${callConnected ? 'text-white' : 'text-gray-500'}`} />
                            )}
                        </button>
                        
                        <button 
                            onClick={leaveChannel}
                            className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center"
                        >
                            <PhoneOff size={28} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgoraVoiceCall;