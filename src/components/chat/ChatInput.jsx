import { useState, useRef } from "react";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { IoSend, IoClose } from "react-icons/io5";
import Picker from "emoji-picker-react";

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
  const inputContainerRef = useRef(null);

  return (
    <div className="p-3 bg-gray-900/80 backdrop-blur-md border-t border-gray-700 flex flex-col relative">
      {/* Image Preview */}
      {imagePreview && (
        <div className="relative w-20 h-20 mb-2">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-cover rounded-md border border-gray-700"
          />
          <button
            onClick={removeSelectedImage}
            className="absolute -top-2 -right-2 bg-red-600 p-1 rounded-full shadow-md hover:bg-red-700 transition-all"
          >
            <IoClose className="h-4 w-4 text-white" />
          </button>
        </div>
      )}

      {/* Input Field & Buttons */}
      <div
        className="flex items-center bg-gray-800/80 rounded-full px-3 py-2 w-full"
        ref={inputContainerRef}
      >
        {/* Emoji Picker Button */}
        <button
          className="p-2 rounded-full hover:bg-gray-700 transition-all"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <BsEmojiSmile className="h-6 w-6 text-gray-400 hover:text-blue-400" />
        </button>

        {/* Image Upload Button */}
        <label className="p-2 rounded-full hover:bg-gray-700 transition-all cursor-pointer">
          <BsImage className="h-6 w-6 text-gray-400 hover:text-blue-400" />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>

        {/* Message Input Field */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none px-2 whitespace-pre-wrap break-words"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={messageInputRef}
        />

        {/* Send Button */}
        <button
          onClick={sendMessage}
          disabled={!selectedFriend?._id || !loggedInUser?._id || !message.trim()}
          className="p-2 ml-1 rounded-full bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoSend className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Emoji Picker Positioned Above Input */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-3">
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
