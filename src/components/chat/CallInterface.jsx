import React, { useRef, useEffect, useState } from "react";
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff } from "lucide-react";

const CallInterface = ({
    callStatus,
    incomingCall,
    activeCall,
    localStream,
    remoteStream,
    isVideoEnabled,
    isAudioEnabled,
    onAcceptCall,
    onRejectCall,
    onEndCall,
    onToggleVideo,
    onToggleAudio,
    caller,
    receiver
}) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [remoteVideoMuted, setRemoteVideoMuted] = useState(false); // State for remote video mute status
    const [remoteAudioMuted, setRemoteAudioMuted] = useState(false); // State for remote audio mute status



    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);


    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);


    // Function to mute/unmute remote video (you'll likely control this from another part of your app)
    const toggleRemoteVideoMute = () => {
        setRemoteVideoMuted(!remoteVideoMuted);
        if (remoteVideoRef.current) {
            remoteVideoRef.current.muted = !remoteVideoMuted;
        }
    };

    // Function to mute/unmute remote audio (you'll likely control this from another part of your app)
    const toggleRemoteAudioMute = () => {
        setRemoteAudioMuted(!remoteAudioMuted);
        if (remoteVideoRef.current) { // Use the same ref as remote video, as it contains both tracks
            remoteVideoRef.current.muted = !remoteAudioMuted;
        }
    };


    const renderCallContent = () => {
        if (callStatus === 'connected' && remoteStream) {
            console.log("Remote stream is active");
        }

        switch (callStatus) {
            case 'calling':
                return (
                    <div className="flex flex-col items-center justify-center h-full w-full"> {/* Added h-full w-full */}
                        <div className="animate-pulse text-2xl mb-4">
                            Calling {receiver}...
                        </div>
                        <button
                            onClick={onEndCall}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4"
                        >
                            <PhoneOff size={24} />
                        </button>
                    </div>
                );
            case 'incoming':
                return (
                    <div className="flex flex-col items-center justify-center h-full w-full"> {/* Added h-full w-full */}
                        <div className="text-2xl mb-4">
                            Incoming call from {caller}
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={onAcceptCall}
                                className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4"
                            >
                                <Phone size={24} />
                            </button>
                            <button
                                onClick={onRejectCall}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4"
                            >
                                <PhoneOff size={24} />
                            </button>
                        </div>
                    </div>
                );
            case 'connected':
                return (
                    <div className="flex flex-col h-full w-full"> {/* Added h-full w-full */}
                        <div className="relative h-3/4 w-full"> {/* Video area takes up 3/4 of the height */}
                            <video ref={remoteVideoRef} autoPlay playsInline muted={remoteVideoMuted} className="object-cover h-full w-full bg-black" /> {/* Added muted prop */}
                            <video ref={localVideoRef} autoPlay playsInline muted={!isVideoEnabled} className="absolute bottom-4 right-4 w-48 h-36 rounded-lg border-2 border-white bg-black" />
                            {/* Remote Mute Controls */}
                            <button onClick={toggleRemoteVideoMute} className="absolute top-4 left-4 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2">
                                {remoteVideoMuted ? <VideoOff size={20} /> : <Video size={20} />}
                            </button>
                            <button onClick={toggleRemoteAudioMute} className="absolute top-12 left-4 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2">
                                {remoteAudioMuted ? <MicOff size={20} /> : <Mic size={20} />}
                            </button>

                        </div>
                        <div className="flex justify-center items-center h-1/4 w-full bg-gray-800"> {/* Control bar takes up 1/4 of the height */}
                            <button onClick={onToggleVideo} className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-4 mx-2">
                                {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
                            </button>
                            <button onClick={onToggleAudio} className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-4 mx-2">
                                {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
                            </button>
                            <button onClick={onEndCall} className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 mx-2">
                                <PhoneOff size={24} />
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-full w-full"> {/* Ensure the component takes up full height and width */}
            {renderCallContent()}
        </div>
    );
};

export default CallInterface;
