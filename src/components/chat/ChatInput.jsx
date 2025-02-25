import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { IoSend, IoClose } from "react-icons/io5";
import Picker from 'emoji-picker-react';

const ChatInput = ({
  message,
  setMessage,
  imagePreview,
  removeSelectedImage,
  showEmojiPicker,
  setShowEmojiPicker,
  handleEmojiClick,
  fileInputRef,
  handleImageUpload,
  messageInputRef,
  sendMessage,
  selectedFriend,
  loggedInUser
}) => {
  return (
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
            className="absolute -top-2 -right-2 bg-red-500 p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
          >
            <IoClose className="h-4 w-4" />
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
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};

export default ChatInput;