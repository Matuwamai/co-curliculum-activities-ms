import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "../services/comments";

const StudentCommentsModal = ({
  activity,
  student,
  onClose,
  onSave,
  setNoticeMessage,
}) => {
  const [comment, setComment] = useState("");

  const createMutationComment = useMutation({
    mutationFn: (commentData) => createComment(commentData),
    onSuccess: (data) => {
      setNoticeMessage("Comment created successfully!");
      onSave(data);
      setComment("");
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    createMutationComment.mutate({
      studentId: student.id,
      userId: userId,
      senderType: user.role,
      activityId: activity.id,
      comment: comment,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Add Comment</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Activity</p>
            <p className="font-medium">{activity.name}</p>

            <p className="text-sm text-gray-500 mt-3 mb-1">Student</p>
            <p className="font-medium">{student?.user?.fullName}</p>

            <p className="text-sm text-gray-500 mt-3 mb-1">Status</p>
            <p
              className={`inline-block px-2 py-1 text-xs rounded-full ${
                student.attendant === "present"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {student.attendant === "present" ? "Present" : "Absent"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Comment
              </label>
              <textarea
                id="comment"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your feedback for this student..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
              >
                Save Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentCommentsModal;
