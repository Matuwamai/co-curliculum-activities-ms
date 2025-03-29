import React from "react";
import DashCard from "../components/DashCard";
import {
  GraduationCap,
  ScissorsLineDashed,
  SquareActivity,
  Users,
} from "lucide-react";

const DashboardPage = () => {
  const stats = {
    totalStudents: 0,
    totalTrainers: 0,
    totalActivities: 0,
  };
  return (
    <div>
      <div className='flex flex-col gap-6'>
        <h1 className='text-2xl font-semibold text-blue-400'>Dashboard</h1>
        <div className='grid grid-cols-3 gap-4'>
          <DashCard
            title='Students'
            subtitle='Total Number of Students'
            iconClass={() => (
              <GraduationCap
                className=''
                size={34}
                count={stats.totalStudents}
              />
            )}
            count={stats.totalStudents}
            link='/students'
          />
          <DashCard
            title='Trainers'
            subtitle='Total Number of Trainers'
            iconClass={() => (
              <ScissorsLineDashed
                className=''
                size={34}
                count={stats.totalStudents}
              />
            )}
            count={stats.totalTrainers}
            link='/trainers'
          />
          <DashCard
            title='Activities'
            subtitle='Total Number of Activities'
            iconClass={() => (
              <SquareActivity
                className=''
                size={34}
                count={stats.totalStudents}
              />
            )}
            count={stats.totalActivities}
            link='/activities'
          />
        </div>
      </div>
      <div className='mt-4'>
        <h6 className='text-md font-normal text-blue-400'>Recent Activities</h6>
        <div className='flex flex-col gap-4 mt-2'>
          <div className='p-4 border border-gray-300 rounded shadow-sm flex items-center gap-4'>
            <Users className='text-blue-400' size={24} />
            <div>
              <p className='font-medium'>John Doe has been promoted to Level 2</p>
              <p className='text-sm text-gray-500'>2 hours ago</p>
            </div>
          </div>
          <div className='p-4 border border-gray-300 rounded shadow-sm flex items-center gap-4'>
            <Users className='text-blue-400' size={24} />
            <div>
              <p className='font-medium'>Jane Smith completed the Advanced Training</p>
              <p className='text-sm text-gray-500'>1 day ago</p>
            </div>
          </div>
          <div className='p-4 border border-gray-300 rounded shadow-sm flex items-center gap-4'>
            <Users className='text-blue-400' size={24} />
            <div>
              <p className='font-medium'>Michael Brown joined the Basketball Program</p>
              <p className='text-sm text-gray-500'>3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
