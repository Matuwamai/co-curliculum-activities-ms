import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { createAnnouncement } from "../services/announcements";

const CreateAnnouncementModal = ({
  activities,
  onClose,
  onCreate,
  setNoticeMessage,
}) => {
  const [announcement, setAnnouncement] = useState({
    activityId: activities.length > 0 ? activities[0].id : "",
    userId: JSON.parse(localStorage.getItem("user")).id,
    title: "",
    announcement: "",
    urgent: false,
  });

  const createAnnouncementMutation = useMutation({
    mutationFn: (announcement) => createAnnouncement(announcement),
    onSuccess: (data) => {
      setNoticeMessage("Announcement created successfully!");
      onCreate(data);
      onClose();
    },
    onError: (error) => {
      console.error("Error creating announcement:", error);
      alert("Failed to create announcement. Please try again.");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnnouncement((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  console.log("Announcement state:", announcement);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedActivity = activities.find(
      (a) => a.id === parseInt(announcement.activityId)
    );
    onCreate({
      ...announcement,
      activityName: selectedActivity?.name,
      activityId: parseInt(selectedActivity?.activityId),
      date: new Date().toISOString(),
    });
    createAnnouncementMutation.mutate(announcement);
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-black/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Create New Announcement
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-1"
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="activityId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  For Activity
                </label>
                <select
                  id="activityId"
                  name="activityId"
                  value={announcement.activityId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">All Activities</option>
                  {activities.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  id="urgent"
                  name="urgent"
                  type="checkbox"
                  checked={announcement.urgent}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="urgent"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Mark as urgent
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Announcement Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={announcement.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter announcement title"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="announcement"
                name="announcement"
                rows="5"
                value={announcement.announcement}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your announcement message..."
                required
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
                Publish Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;
