import React, { useState } from "react";
import {
  FiActivity,
  FiUsers,
  FiMessageSquare,
  FiBell,
  FiCalendar,
  FiPlus,
} from "react-icons/fi";
import TrainerHeader from "../components/TrainerHeader";
import TrainerFooter from "../components/TrainerFooter";
import ActivityList from "../components/ActivityList";
import StudentCommentsModal from "../components/StudentCommentsModal";
import CreateAnnouncementModal from "../components/CreateAnnouncementModal";

const TrainerDashboard = () => {
  // Dummy data for activities
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Basketball Training",
      date: "2023-06-15",
      time: "16:00 - 18:00",
      location: "Main Court",
      students: [
        { id: 101, name: "John Doe", attendance: "present", comment: "" },
        {
          id: 102,
          name: "Jane Smith",
          attendance: "absent",
          comment: "Injured ankle",
        },
        { id: 103, name: "Mike Johnson", attendance: "present", comment: "" },
      ],
    },
    {
      id: 2,
      name: "Football Practice",
      date: "2023-06-16",
      time: "14:00 - 16:00",
      location: "Field A",
      students: [
        { id: 201, name: "Alex Brown", attendance: "present", comment: "" },
        {
          id: 202,
          name: "Sarah Wilson",
          attendance: "present",
          comment: "Needs more stamina training",
        },
      ],
    },
    {
      id: 3,
      name: "Swimming Session",
      date: "2023-06-17",
      time: "10:00 - 12:00",
      location: "Olympic Pool",
      students: [
        {
          id: 301,
          name: "David Lee",
          attendance: "present",
          comment: "Excellent technique",
        },
        { id: 302, name: "Emily Chen", attendance: "present", comment: "" },
        {
          id: 303,
          name: "Robert Taylor",
          attendance: "absent",
          comment: "Family emergency",
        },
        {
          id: 304,
          name: "Olivia Martinez",
          attendance: "present",
          comment: "",
        },
      ],
    },
  ]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const handleStudentSelect = (activity, student) => {
    setSelectedActivity(activity);
    setSelectedStudent(student);
    setShowCommentsModal(true);
  };

  const saveComment = (comment) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === selectedActivity.id
          ? {
              ...activity,
              students: activity.students.map((student) =>
                student.id === selectedStudent.id
                  ? { ...student, comment }
                  : student
              ),
            }
          : activity
      )
    );
    setShowCommentsModal(false);
  };

  const createAnnouncement = (announcement) => {
    // In a real app, this would send to backend
    console.log("New announcement:", announcement);
    setShowAnnouncementModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TrainerHeader />

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <button
              onClick={() => setShowAnnouncementModal(true)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              <FiPlus className="mr-2" />
              New Announcement
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              icon={<FiActivity className="text-blue-600" size={24} />}
              title="Total Activities"
              value={activities.length}
              className="bg-white"
            />
            <DashboardCard
              icon={<FiUsers className="text-green-600" size={24} />}
              title="Total Students"
              value={activities.reduce(
                (sum, activity) => sum + activity.students.length,
                0
              )}
              className="bg-white"
            />
            <DashboardCard
              icon={<FiCalendar className="text-purple-600" size={24} />}
              title="Upcoming Sessions"
              value={
                activities.filter((a) => new Date(a.date) >= new Date()).length
              }
              className="bg-white"
            />
          </div>

          <ActivityList
            activities={activities}
            onStudentSelect={handleStudentSelect}
          />
        </div>
      </main>

      <TrainerFooter />

      {/* Modals */}
      {showCommentsModal && (
        <StudentCommentsModal
          activity={selectedActivity}
          student={selectedStudent}
          onClose={() => setShowCommentsModal(false)}
          onSave={saveComment}
        />
      )}

      {showAnnouncementModal && (
        <CreateAnnouncementModal
          activities={activities}
          onClose={() => setShowAnnouncementModal(false)}
          onCreate={createAnnouncement}
        />
      )}
    </div>
  );
};

const DashboardCard = ({ icon, title, value, className }) => (
  <div
    className={`p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}
  >
    <div className="flex items-center">
      <div className="p-3 rounded-lg bg-opacity-20 bg-blue-100 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

export default TrainerDashboard;
