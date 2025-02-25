const Message = ({ message, loggedInUser, getMessageStatus, setSelectedImageModal }) => {
    const isOwnMessage = message.sender === loggedInUser?._id;
    
    return (
      <div
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
        data-message-id={message._id}
      >
        <div className={`rounded-2xl p-4 shadow-lg w-max max-w-[70%] ${
          isOwnMessage 
            ? 'bg-blue-600 rounded-br-none' 
            : 'bg-gray-800/80 rounded-bl-none'
        }`}>
          {message.imageUrl && (
            <div className="mb-2"> 
              <img 
                src={`http://localhost:8081${message.imageUrl}`}
                alt="Message attachment"
                className="rounded-lg max-w-sm hover:opacity-90 transition-opacity cursor-pointer"
                onClick={() => setSelectedImageModal(`http://localhost:8081${message.imageUrl}`)}
              />
            </div>
          )}
          {message.text && (
            <p className="text-white/90">{message.text}</p>
          )}
          <div className="flex items-center justify-end mt-2 space-x-2">
            <span className="text-xs text-white/60">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {getMessageStatus(message) && (
              <span className="text-xs text-white/60">
                {getMessageStatus(message) === "seen" ? "✓✓" : "✓"}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Message;
  