import React, { useState } from "react";
import {
  FiMessageSquare,
  FiCalendar,
  FiUser,
  FiMapPin,
  FiClock,
  FiSend,
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiX,
} from "react-icons/fi";
import TrainerHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

const StudentDashboard = () => {
  // Dummy data
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "Coach James",
      text: "Remember to bring your training gear tomorrow",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      from: "System",
      text: "Your payment for March has been received",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      from: "Coach James",
      text: "Session moved to Field B this week",
      time: "3 days ago",
      read: true,
    },
    {
      id: 4,
      from: "Admin",
      text: "New training schedule available",
      time: "1 week ago",
      read: true,
    },
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Football Training",
      trainer: "Coach James",
      venue: "Main Field",
      time: "Mon & Wed 4-6pm",
      upcoming: "Tomorrow at 4pm",
    },
    {
      id: 2,
      name: "Fitness Session",
      trainer: "Trainer Sarah",
      venue: "Gymnasium",
      time: "Tue & Thu 5-7pm",
      upcoming: "Next Tuesday at 5pm",
    },
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Weather Notice",
      content: "All outdoor sessions canceled due to rain",
      date: "Today",
    },
    {
      id: 2,
      title: "New Equipment",
      content: "New weights available in the gym",
      date: "2 days ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    messages: true,
    activities: true,
    announcements: true,
    sendMessage: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const markAsRead = (id) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      // In real app, this would send to backend
      alert(`Comment sent to trainer: ${newComment}`);
      setNewComment("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TrainerHeader
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        role="student"
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="absolute top-0 right-0 h-full w-4/5 bg-white shadow-lg p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
            <div className="mt-12 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById("messages").scrollIntoView();
                }}
                className="w-full text-left p-3 flex items-center justify-between bg-blue-50 rounded-lg"
              >
                Messages
                <FiMessageSquare className="text-blue-600" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById("activities").scrollIntoView();
                }}
                className="w-full text-left p-3 flex items-center justify-between bg-green-50 rounded-lg"
              >
                Activities
                <FiCalendar className="text-green-600" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById("announcements").scrollIntoView();
                }}
                className="w-full text-left p-3 flex items-center justify-between bg-purple-50 rounded-lg"
              >
                Announcements
                <FiUser className="text-purple-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Cards - Stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <DashboardCard
              icon={<FiMessageSquare className="text-blue-600" size={24} />}
              title="Unread Messages"
              value={messages.filter((m) => !m.read).length}
              className="bg-white"
              onClick={() =>
                document.getElementById("messages").scrollIntoView()
              }
            />
            <DashboardCard
              icon={<FiCalendar className="text-green-600" size={24} />}
              title="Upcoming Sessions"
              value={activities.length}
              className="bg-white"
              onClick={() =>
                document.getElementById("activities").scrollIntoView()
              }
            />
            <DashboardCard
              icon={<FiUser className="text-purple-600" size={24} />}
              title="Active Trainers"
              value={new Set(activities.map((a) => a.trainer)).size}
              className="bg-white"
            />
          </div>

          {/* Main Content - Stack on mobile */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            {/* Left Column - Messages */}
            <div className="lg:w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection("messages")}
                id="messages"
              >
                <h2 className="text-lg md:text-xl font-semibold flex items-center">
                  <FiMessageSquare className="mr-2 text-blue-600" />
                  Recent Messages
                </h2>
                {expandedSections.messages ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </div>

              {expandedSections.messages && (
                <div className="mt-4 space-y-3">
                  {messages.slice(0, 4).map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        !message.read
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setSelectedMessage(message);
                        markAsRead(message.id);
                      }}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm md:text-base">
                          {message.from}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {message.time}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                        {message.text}
                      </p>
                    </div>
                  ))}
                  <button className="w-full mt-3 text-xs md:text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View All Messages
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Stacked content */}
            <div className="lg:w-2/3 space-y-4 md:space-y-6">
              {/* My Activities */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("activities")}
                  id="activities"
                >
                  <h2 className="text-lg md:text-xl font-semibold flex items-center">
                    <FiCalendar className="mr-2 text-green-600" />
                    My Activities
                  </h2>
                  {expandedSections.activities ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </div>

                {expandedSections.activities && (
                  <div className="mt-4">
                    {/* Mobile cards view */}
                    <div className="lg:hidden space-y-4">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="border rounded-lg p-4 hover:bg-gray-50"
                        >
                          <div className="font-medium text-gray-900">
                            {activity.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            <div className="flex items-center">
                              <FiUser className="mr-2" />
                              {activity.trainer}
                            </div>
                            <div className="flex items-center mt-1">
                              <FiMapPin className="mr-2" />
                              {activity.venue}
                            </div>
                            <div className="flex items-center mt-1">
                              <FiClock className="mr-2" />
                              {activity.time}
                            </div>
                            <div className="mt-2 text-sm">
                              Next: {activity.upcoming}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop table view */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Activity
                            </th>
                            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Trainer
                            </th>
                            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Venue
                            </th>
                            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Schedule
                            </th>
                            <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Next Session
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {activities.map((activity) => (
                            <tr key={activity.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {activity.name}
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                                {activity.trainer}
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center">
                                  <FiMapPin className="mr-1" />
                                  {activity.venue}
                                </div>
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center">
                                  <FiClock className="mr-1" />
                                  {activity.time}
                                </div>
                              </td>
                              <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                                {activity.upcoming}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Announcements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("announcements")}
                  id="announcements"
                >
                  <h2 className="text-lg md:text-xl font-semibold">
                    Announcements
                  </h2>
                  {expandedSections.announcements ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </div>

                {expandedSections.announcements && (
                  <div className="mt-4 space-y-3 md:space-y-4">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="border-l-4 border-blue-500 pl-3 py-2"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-base md:text-lg">
                            {announcement.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {announcement.date}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm md:text-base mt-1">
                          {announcement.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Comment to Trainer */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("sendMessage")}
                >
                  <h2 className="text-lg md:text-xl font-semibold">
                    Send Message to Trainer
                  </h2>
                  {expandedSections.sendMessage ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </div>

                {expandedSections.sendMessage && (
                  <div className="mt-4">
                    <div className="flex flex-col md:flex-row gap-2">
                      <select className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select Trainer</option>
                        {[...new Set(activities.map((a) => a.trainer))].map(
                          (trainer, i) => (
                            <option key={i} value={trainer}>
                              {trainer}
                            </option>
                          )
                        )}
                      </select>
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={handleSendComment}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center text-sm md:text-base"
                        >
                          <FiSend className="mr-1 md:mr-2" />
                          <span className="hidden md:inline">Send</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Message Detail Modal - Improved for mobile */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-4 md:p-6">
            <div className="flex justify-between items-start mb-3 md:mb-4 sticky top-0 bg-white py-2">
              <h3 className="text-base md:text-lg font-semibold">
                {selectedMessage.from}
              </h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="mb-4 md:mb-6">
              <p className="text-gray-600 text-sm md:text-base">
                {selectedMessage.text}
              </p>
              <div className="text-xs text-gray-500 mt-3">
                {selectedMessage.time}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <textarea
                placeholder="Type your reply..."
                className="border border-gray-300 rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm md:text-base"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm md:text-base">
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <UserFooter />
    </div>
  );
};

// Enhanced DashboardCard with click handler
const DashboardCard = ({ icon, title, value, className, onClick }) => (
  <div
    className={`p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 ${className} transition-transform hover:scale-[1.02] cursor-pointer`}
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="p-2 md:p-3 rounded-lg bg-opacity-20 bg-blue-100 mr-3 md:mr-4">
        {icon}
      </div>
      <div>
        <p className="text-xs md:text-sm font-medium text-gray-500">{title}</p>
        <p className="text-xl md:text-2xl font-semibold text-gray-800">
          {value}
        </p>
      </div>
    </div>
  </div>
);

export default StudentDashboard;
