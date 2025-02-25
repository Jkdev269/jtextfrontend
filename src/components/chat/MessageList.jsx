import { BsImage } from "react-icons/bs";
import Message from './Message';

const MessageList = ({ 
  messageListRef, 
  loadingMessages, 
  messages, 
  selectedFriend, 
  loggedInUser, 
  getMessageStatus,
  setSelectedImageModal 
}) => {
  return (
    <div 
      ref={messageListRef}
      className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
    >
      {loadingMessages ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center">
            <BsImage className="h-8 w-8 text-gray-500" />
          </div>
          <p className="text-gray-500 text-lg">
            Start chatting with {selectedFriend?.username}
          </p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <Message 
            key={msg._id || index}
            message={msg}
            loggedInUser={loggedInUser}
            getMessageStatus={getMessageStatus}
            setSelectedImageModal={setSelectedImageModal}
          />
        ))
      )}
    </div>
  );
};

export default MessageList;