import { BsTelephone, BsCameraVideo } from "react-icons/bs";

const ChatHeader = ({ selectedFriend, setSelectedFriend, isUserOnline, onVoiceCallClick, onVideoCallClick }) => {
  return (
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
        <button 
          onClick={onVoiceCallClick} 
          className="p-3 rounded-full hover:bg-gray-800/50 transition-all duration-300 group"
        >
          <BsTelephone className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
        </button>
        <button 
          onClick={onVideoCallClick} 
          className="p-3 rounded-full hover:bg-gray-800/50 transition-all duration-300 group"
        >
          <BsCameraVideo className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
