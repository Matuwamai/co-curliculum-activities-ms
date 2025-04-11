import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  fetchActivities,
  assignActivityToStudent,
} from "../services/activities";

const ViewActivity = () => {
  const { id: studentId } = useParams();
  const queryClient = useQueryClient();
  const [selectedActivityId, setSelectedActivityId] = useState("");

  // Fetch all available activities
  const {
    data: allActivities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allActivities"],
    queryFn: fetchActivities,
  });

  // Fetch student's current activities
  const {
    data: studentActivities = [],
    isLoading: isLoadingStudentActivities,
  } = useQuery({
    queryKey: ["studentActivities", studentId],
    queryFn: () => fetchStudentActivities(studentId), // You'll need to implement this
  });

  // Mutation for assigning activity
  const { mutate: assignActivity, isPending: isAssigning } = useMutation({
    mutationFn: ({ activityId, studentId }) => {
      console.log(
        "Assigning activity in mutation func:",
        activityId,
        studentId
      );
      assignActivityToStudent({ activityId, studentId });
    },
    onSuccess: () => {
      toast.success("Activity assigned successfully");
      setSelectedActivityId(""); // Reset selection
      queryClient.invalidateQueries(["studentActivities", studentId]);
    },
    onError: () => {
      toast.error("Failed to assign activity");
    },
  });

  // Mutation for removing activity
  const { mutate: removeActivity } = useMutation({
    mutationFn: (activityId) =>
      removeActivityFromStudent(activityId, studentId), // Implement this
    onSuccess: () => {
      toast.success("Activity removed successfully");
      queryClient.invalidateQueries(["studentActivities", studentId]);
    },
    onError: () => {
      toast.error("Failed to remove activity");
    },
  });

  const handleAssign = () => {
    console.log("Assigning activity:", selectedActivityId, studentId);
    if (!selectedActivityId || !studentId) return;

    const activityExists = studentActivities.some(
      (a) => a.id === Number(selectedActivityId)
    );

    if (activityExists) {
      toast.warning("Activity already assigned");
      return;
    }

    assignActivity({
      activityId: Number(selectedActivityId),
      studentId: studentId,
    });
  };

  const handleRemove = (activityId) => {
    removeActivity(activityId);
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Student Activities</h2>

      {isLoadingStudentActivities ? (
        <p>Loading activities...</p>
      ) : studentActivities.length === 0 ? (
        <p className="text-gray-500">No activities assigned yet.</p>
      ) : (
        <ul className="mb-4">
          {studentActivities.map((activity) => (
            <li
              key={activity.id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {activity.name} - {activity.type} - {activity.location}
              </span>
              <button
                className="text-red-500 text-sm"
                onClick={() => handleRemove(activity.id)}
                disabled={isAssigning}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2 items-center">
        <select
          value={selectedActivityId}
          onChange={(e) => setSelectedActivityId(e.target.value)}
          className="border px-2 py-1 rounded"
          disabled={isLoading || isAssigning}
        >
          <option value="">-- Select Activity --</option>
          {isLoading ? (
            <option>Loading activities...</option>
          ) : isError ? (
            <option>Error loading activities</option>
          ) : (
            allActivities.map((act) => (
              <option key={act.id} value={act.id}>
                {act.name}
              </option>
            ))
          )}
        </select>

        <button
          onClick={handleAssign}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
          disabled={!selectedActivityId || isAssigning}
        >
          {isAssigning ? "Assigning..." : "Assign"}
        </button>
      </div>
    </div>
  );
};

export default ViewActivity;
