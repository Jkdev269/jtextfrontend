import { useState } from "react";

const Message = ({
  message,
  loggedInUser,
  getMessageStatus,
  setSelectedImageModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isOwnMessage = message.sender === loggedInUser?._id;
  const maxLength = 100; // Max characters before trimming

  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
      data-message-id={message._id}
      data-sender={message.sender}
    >
      <div
        className={`rounded-2xl p-4 shadow-lg w-max max-w-[70%] ${
          isOwnMessage
            ? "bg-blue-600 rounded-br-none"
            : "bg-gray-800/80 rounded-bl-none"
        } `}
      >
        {message.imageUrl && (
          <div className="mb-2">
            <img
              src={`http://localhost:8081${message.imageUrl}`}
              alt="Message attachment"
              className="rounded-lg max-w-sm hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() =>
                setSelectedImageModal(
                  `http://localhost:8081${message.imageUrl}`
                )
              }
            />
          </div>
        )}
        {message.text && (
          <p className="text-white/90 whitespace-pre-wrap break-words">
            {isExpanded
              ? message.text
              : message.text.length > maxLength
              ? `${message.text.slice(0, maxLength)}...`
              : message.text}
            {message.text.length > maxLength && (
              <button
                className="ml-2 text-blue-300 text-xs underline"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            )}
          </p>
        )}
        <div className="flex items-center justify-end mt-2 space-x-2">
          <span className="text-xs text-white/60">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isOwnMessage && (
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
