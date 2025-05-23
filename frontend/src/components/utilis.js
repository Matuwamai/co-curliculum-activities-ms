export const organizeMessagesIntoThreads = (messages) => {
  const messageMap = {};
  const threads = [];

  // Create a map of messages with empty replies array
  messages.forEach(message => {
    messageMap[message.id] = { ...message, replies: [] };
  });

  // Link replies to their parent messages or add to root threads
  messages.forEach(message => {
    if (message.parentId && messageMap[message.parentId]) {
      messageMap[message.parentId].replies.push(messageMap[message.id]);
    } else {
      threads.push(messageMap[message.id]);
    }
  });

  return threads;
};


// // Standardized version using best practices from both
// export function buildThreadTree(messages, parentIdField = 'parentId') {
//   const messageMap = new Map();
//   const roots = [];

//   // Create all nodes first
//   messages.forEach(message => {
//     messageMap.set(message.id, { ...message, replies: [] });
//   });

//   // Build hierarchy
//   messages.forEach(message => {
//     const node = messageMap.get(message.id);
//     const parentId = message[parentIdField];
    
//     if (parentId && messageMap.has(parentId)) {
//       messageMap.get(parentId).replies.push(node);
//       // Sort replies by date (newest last, like most messaging apps)
//       messageMap.get(parentId).replies.sort((a, b) => 
//         new Date(a.createdAt) - new Date(b.createdAt)
//       );
//     } else {
//       roots.push(node);
//     }
//   });

//   // Sort root messages chronologically (oldest first)
//   roots.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

//   return roots;
// }