import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  fetchActivities,
  assignActivityToStudent,
  fetchActivitiesByStudentId,
  removeActivityFromStudent,
} from "../services/activities";

const ViewActivity = ({ userType = "" }) => {
  const queryClient = useQueryClient();
  const { id: studentId } = useParams();
  const [selectedActivityId, setSelectedActivityId] = useState("");

  const {
    data: allActivities = [],
    isLoading: isLoadingActivities,
    isError: isActivitiesError,
  } = useQuery({
    queryKey: ["allActivities"],
    queryFn: fetchActivities,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: studentActivitiesResponse = { activities: [], studentId: null },
    isLoading: isLoadingStudentActivities,
    isError: isStudentActivitiesError,
  } = useQuery({
    queryKey: ["studentActivities", studentId],
    queryFn: () => fetchActivitiesByStudentId(studentId),
    staleTime: 1000 * 60 * 5,
  });

  const studentActivities = studentActivitiesResponse.activities;

  // Mutation for assigning activity
  const { mutate: assignActivity, isPending: isAssigning } = useMutation({
    mutationFn: (activityId) =>
      assignActivityToStudent({
        studentId: Number(studentId),
        activityId: Number(activityId),
      }),
    onSuccess: () => {
      toast.success("Activity assigned successfully");
      setSelectedActivityId("");
      queryClient.invalidateQueries(["studentActivities", studentId]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to assign activity");
    },
  });

  const { mutate: removeActivity, isPending: isRemoving } = useMutation({
    mutationFn: (activityId) => {
      console.log("Removing activity with ID:", activityId);
      return removeActivityFromStudent(studentId, activityId);
    },
    onSuccess: () => {
      toast.success("Activity removed successfully");
      queryClient.invalidateQueries(["studentActivities", studentId]);
    },
    onError: (error) => {
      console.error("Error removing activity:", error);
      toast.error(error.message || "Failed to remove activity");
    },
  });

  // Only show available activities when both queries have completed
  const availableActivities =
    isLoadingActivities || isLoadingStudentActivities
      ? []
      : allActivities.filter(
          (activity) =>
            !studentActivities.some(
              (studentActivity) => studentActivity.id === activity.id
            )
        );

  const handleAssign = () => {
    if (!selectedActivityId) {
      toast.warning("Please select an activity");
      return;
    }
    assignActivity(Number(selectedActivityId));
  };

  const handleRemove = (activityId) => {
    console.log("Removing activity with ID:", activityId);
    if (window.confirm("Are you sure you want to remove this activity?")) {
      removeActivity(activityId);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      {userType === "student" ? (
        <h2 className="text-lg font-bold mb-2">Student Activities</h2>
      ) : (
        <h2 className="text-lg font-bold mb-2">Trainer Activities</h2>
      )}

      {isLoadingStudentActivities ? (
        <p>Loading student's activities...</p>
      ) : studentActivities.length === 0 ? (
        <p className="text-gray-500">No activities assigned yet.</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {studentActivities.map((activity) => (
            <li
              key={activity.id}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="flex-1">
                <span className="font-medium">{activity.name}</span>
                <span className="text-sm text-gray-600 ml-2">
                  ({activity.type} - {activity.location})
                </span>
              </span>
              <button
                className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                onClick={() => handleRemove(activity.id)}
                disabled={isRemoving}
              >
                {isRemoving ? "Removing..." : "Remove"}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Activity Assign Section */}
      <div className="flex gap-2 items-center mt-4">
        <select
          value={selectedActivityId}
          onChange={(e) => setSelectedActivityId(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
          disabled={
            isLoadingActivities || isLoadingStudentActivities || isAssigning
          }
        >
          <option value="">-- Select Activity to Assign --</option>
          {isLoadingActivities || isLoadingStudentActivities ? (
            <option>Loading activities...</option>
          ) : isActivitiesError ? (
            <option>Error loading activities</option>
          ) : (
            availableActivities.map((act) => (
              <option key={act.id} value={act.id}>
                {act.name} ({act.type})
              </option>
            ))
          )}
        </select>

        <button
          onClick={handleAssign}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={
            !selectedActivityId || isAssigning || isLoadingStudentActivities
          }
        >
          {isAssigning ? "Assigning..." : "Assign"}
        </button>
      </div>
    </div>
  );
};

export default ViewActivity;
