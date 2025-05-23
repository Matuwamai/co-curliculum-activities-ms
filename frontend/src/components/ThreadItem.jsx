import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiMessageSquare, FiCornerUpLeft } from "react-icons/fi";

const ThreadItem = ({ 
  message, 
  onClick, 
  trainerName, 
  depth = 0,
  isInModal = false,
  onReply,
  isActiveThread = false
}) => {
  const hasReplies = message.replies && message.replies.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(message.id, replyText);
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  return (
    <div 
      className={`
        ${!message.read && !isInModal ? "bg-blue-50" : ""}
        ${isActiveThread ? "ring-1 ring-blue-400" : ""}
        ${depth > 0 ? "border-l-2 border-gray-200 pl-4 ml-4" : ""}
        transition-colors duration-150 rounded-lg
      `}
    >
      <div 
        className={`p-4 ${isInModal ? "" : "cursor-pointer"}`}
        onClick={!isInModal ? onClick : undefined}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {depth > 0 && (
              <span className="text-gray-400 mr-2">↳</span>
            )}
            <h3 className="font-medium flex items-center">
              <FiMessageSquare className="mr-2 text-blue-500" size={14} />
              {trainerName}
            </h3>
          </div>
          <span className="text-xs text-gray-500 shrink-0">
            {new Date(message.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>
        </div>
        <p className={`text-gray-600 text-sm mt-1 ${depth > 0 ? "ml-6" : ""}`}>
          {message.comment}
        </p>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex space-x-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowReplyBox(!showReplyBox);
              }}
              className="flex items-center text-xs text-blue-600 hover:text-blue-800"
            >
              <FiCornerUpLeft className="mr-1" size={12} />
              Reply
            </button>
            
            {hasReplies && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="flex items-center text-xs text-blue-600 hover:text-blue-800"
              >
                {isExpanded ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
                <span className="ml-1">
                  {message.replies.length} {message.replies.length === 1 ? 'reply' : 'replies'}
                </span>
              </button>
            )}
          </div>
          
          {!message.read && !isInModal && (
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          )}
        </div>

        {showReplyBox && (
          <div className="mt-3 ml-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
              rows={2}
              autoFocus
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReplyBox(false);
                }}
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReplySubmit();
                }}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={!replyText.trim()}
              >
                Post Reply
              </button>
            </div>
          </div>
        )}
      </div>

      {hasReplies && isExpanded && (
        <div className="space-y-2 pl-2">
          {message.replies.map((reply) => (
            <ThreadItem
              key={reply.id}
              message={reply}
              onClick={onClick}
              trainerName={trainerName}
              depth={depth + 1}
              isInModal={isInModal}
              onReply={onReply}
              isActiveThread={isActiveThread && selectedMessage?.id === reply.id}
             
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadItem;