import React from "react";
import { FiUsers, FiMessageSquare, FiBell } from "react-icons/fi";

const ActivityList = ({ activities, onStudentSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Your Activities</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-6 hover:bg-gray-50 transition duration-150"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-medium text-gray-800">
                  {activity.name}
                </h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <span>{activity.date}</span>
                  <span className="mx-2">•</span>
                  <span>{activity.time}</span>
                  <span className="mx-2">•</span>
                  <span>{activity.location}</span>
                </div>
              </div>

              <div className="flex items-center">
                <span className="flex items-center text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <FiUsers className="mr-1" />
                  {activity.students.length} students
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Students
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activity.students.map((student) => (
                  <div
                    key={student.id}
                    className={`p-3 rounded-lg border ${
                      student.attendance === "present"
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          {student.name}
                        </p>
                        <p
                          className={`text-xs ${
                            student.attendance === "present"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {student.attendance === "present"
                            ? "Present"
                            : "Absent"}
                        </p>
                      </div>
                      <button
                        onClick={() => onStudentSelect(activity, student)}
                        className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition duration-150"
                        title="Add comment"
                      >
                        <FiMessageSquare />
                      </button>
                    </div>
                    {student.comment && (
                      <p className="mt-2 text-xs text-gray-600 italic">
                        "{student.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
