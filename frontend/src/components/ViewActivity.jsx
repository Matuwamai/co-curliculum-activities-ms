import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "../lib/queryClient";
import { fetchActivities } from "../services/activities";

const ViewActivity = () => {
  const [studentActivities, setStudentActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState("");

  const {
    data: allActivities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allActivities"],
    queryFn: fetchActivities,
  });

  const handleAssign = () => {
    const selected = allActivities.find(
      (a) => a.id === Number(selectedActivityId)
    );
    if (selected && !studentActivities.some((a) => a.id === selected.id)) {
      setStudentActivities((prev) => [...prev, selected]);
    }
  };

  const handleRemove = (activityId) => {
    setStudentActivities((prev) => prev.filter((act) => act.id !== activityId));
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Current Activities</h2>

      {studentActivities.length === 0 ? (
        <p className="text-gray-500">You have no activity yet.</p>
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
        >
          <option value="">-- Select Activity --</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : isError ? (
            <option>Error loading</option>
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
          className="bg-blue-500 text-white px-3 py-1 rounded"
          disabled={!selectedActivityId}
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default ViewActivity;
