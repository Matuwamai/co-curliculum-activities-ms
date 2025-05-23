import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import ThreadItem from "./ThreadItem";

const MessageThreadModal = ({
  selectedMessage,
  setSelectedMessage,
  newMessage,
  setNewMessage,
  handleSendMessage,
  trainerName,
  handleReply
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col"
      >
        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white flex justify-between items-center">
          <h3 className="font-semibold">Message Thread</h3>
          <button
            onClick={() => setSelectedMessage(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          <ThreadItem
            message={selectedMessage}
            onClick={(msg) => setSelectedMessage(msg)}
            trainerName={trainerName}
            depth={0}
            isInModal={true}
            onReply={handleReply}
            isActiveThread={true}
          />
        </div>

        <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your reply..."
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setSelectedMessage(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={!newMessage.trim()}
            >
              Post Reply
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MessageThreadModal;