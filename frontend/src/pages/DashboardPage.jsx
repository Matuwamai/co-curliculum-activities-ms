import React, { useEffect, useState } from "react";
import DashCard from "../components/DashCard";
import { fetchActivities } from "../services/activities";
import { fetchStudents } from "../services/students";
import { fetchTrainers } from "../services/trainer";
import {
  GraduationCap,
  ScissorsLineDashed,
  SquareActivity,
  Users,
} from "lucide-react";

const DashboardPage = () => {
  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [activities, setActivities] = useState([]);
  const stats = {
    totalStudents: students.length,
    totalTrainers: trainers.length,
    totalActivities: activities.length,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, trainersData, activitiesData] = await Promise.all([
          fetchStudents(),
          fetchTrainers(),
          fetchActivities(),
        ]);
        setStudents(studentsData);
        setTrainers(trainersData);
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-blue-400">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          <DashCard
            title="Students"
            subtitle="Total Number of Students"
            iconClass={() => (
              <GraduationCap
                className=""
                size={34}
                count={stats.totalStudents}
              />
            )}
            count={stats.totalStudents}
            link="/students"
          />
          <DashCard
            title="Trainers"
            subtitle="Total Number of Trainers"
            iconClass={() => (
              <ScissorsLineDashed
                className=""
                size={34}
                count={stats.totalStudents}
              />
            )}
            count={stats.totalTrainers}
            link="/trainers"
          />
          <DashCard
            title="Activities"
            subtitle="Total Number of Activities"
            iconClass={() => (
              <SquareActivity
                className=""
                size={34}
                count={stats.totalStudents}
              />
            )}
            count={stats.totalActivities}
            link="/activities"
          />
        </div>
      </div>
      <div className="mt-4">
        <h6 className="text-md font-normal text-blue-400">Recent Activities</h6>
        <div className="flex flex-col gap-4 mt-2">
          <div className="p-4 border border-gray-300 rounded shadow-sm flex items-center gap-4">
            <Users className="text-blue-400" size={24} />
            <div>
              <p className="font-medium">
                John Doe has been promoted to Level 2
              </p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="p-4 border border-gray-300 rounded shadow-sm flex items-center gap-4">
            <Users className="text-blue-400" size={24} />
            <div>
              <p className="font-medium">
                Jane Smith completed the Advanced Training
              </p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="p-4 border border-gray-300 rounded shadow-sm flex items-center gap-4">
            <Users className="text-blue-400" size={24} />
            <div>
              <p className="font-medium">
                Michael Brown joined the Basketball Program
              </p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
