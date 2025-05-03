import React, { useEffect, useState } from "react";
import {
  FiActivity,
  FiUsers,
  FiMessageSquare,
  FiBell,
  FiCalendar,
  FiPlus,
} from "react-icons/fi";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";
import ActivityList from "../components/ActivityList";
import StudentCommentsModal from "../components/StudentCommentsModal";
import CreateAnnouncementModal from "../components/CreateAnnouncementModal";
import { useQuery } from "@tanstack/react-query";
import { fetchActivitiesByTrainerId } from "../services/activities";
import { fetchStudentsByTrainerId } from "../services/studentTrainer";

const TrainerDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showCommentNotice, setShowCommentNotice] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const trainerId = user.id;
  const {
    data: activityData,
    error: activityError,
    isLoading: activityLoading,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchActivitiesByTrainerId(trainerId),
  });

  useEffect(() => {
    if (activityData) {
      setActivities(activityData);
    }
  }, [activityData]);
  const {
    data,
    error: student,
    isLoading: studentLoading,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () => fetchStudentsByTrainerId(user.id),
  });

  useEffect(() => {
    if (data) {
      const updatedData = data.map((student) => ({
        ...student,
        attendant: student.attendant.toLowerCase(),
      }));
      setStudents(updatedData);
    }
  }, [data]);

  if (activityLoading) return <p> Activity Loading...</p>;
  if (activityError)
    return <p>Error fetching activities: {activityError.message}</p>;
  if (studentLoading) return <p> Student Loading...</p>;
  if (student) return <p>Error fetching students: {student.message}</p>;

  const handleStudentSelect = (activity, student) => {
    setSelectedActivity(activity);
    setSelectedStudent(student);
    setShowCommentsModal(true);
  };

  const saveComment = () => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === selectedActivity.id
          ? {
              ...activity,
              students: students.map((student) =>
                student.id === selectedStudent.id ? { ...student } : student
              ),
            }
          : activity
      )
    );
    setShowCommentNotice(true);
    setTimeout(() => {
      setShowCommentNotice(false);
    }, 3000);
    setShowCommentsModal(false);
  };
  const createAnnouncement = (announcement) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === announcement.activityId
          ? {
              ...activity,
              announcements: [
                ...(activity.announcements || []),
                { ...announcement },
              ],
            }
          : activity
      )
    );
    setShowCommentNotice(true);
    setTimeout(() => {
      setShowCommentNotice(false);
    }, 3000);
    setShowAnnouncementModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <UserHeader role="trainer" />

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
              value={students.length}
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
            students={students}
            onStudentSelect={handleStudentSelect}
          />
        </div>
      </main>

      <UserFooter />

      {/* Modals */}
      {showCommentsModal && (
        <StudentCommentsModal
          activity={selectedActivity}
          student={selectedStudent}
          comments={comments}
          setNoticeMessage={setNoticeMessage}
          onClose={() => setShowCommentsModal(false)}
          onSave={saveComment}
        />
      )}

      {showAnnouncementModal && (
        <CreateAnnouncementModal
          activities={activities}
          setNoticeMessage={setNoticeMessage}
          onClose={() => setShowAnnouncementModal(false)}
          onCreate={createAnnouncement}
        />
      )}
      {showCommentNotice && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-4 py-2 rounded shadow z-50">
          {noticeMessage}
        </div>
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
