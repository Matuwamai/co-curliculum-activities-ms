import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchActivities } from "../services/activities";
import { createSchedule } from "../services/schedules";

const fixedTime = [
  "8:00 ",
  "10:00 ",
  "12:00 ",
  "2:00",
  "4:00 ",
  "6:00",
];

const fixedTimeAmPm = fixedTime.map((timeStr) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute || 0);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
});
console.log("fixed time am pm", fixedTimeAmPm);

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CreateSchedulePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    activityId: "",
    day: "",
    startTime: "",
    endTime: "",
  });

  const {
    data: activities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });

  const convertToISOTime = (timeStr) => {
    const today = new Date();
    const [hour, minute] = timeStr.trim().split(":").map(Number);
    today.setHours(hour, minute || 0, 0, 0);
    return today.toISOString();
  };
  const fixedTimeISO = fixedTime.map(convertToISOTime);
  console.log("fixed time", fixedTime);
  console.log("fix time iso", fixedTimeISO);

  const { mutate, isPending } = useMutation({
    mutationFn: createSchedule,
    onSuccess: (data) => {
      alert("Schedule created successfully!");
      console.log(data);
      setFormData({
        activityId: "",
        day: "",
        startTime: "",
        endTime: "",
      });
      navigate("/trainning-schedules");
    },
    onError: (error) => {
      alert("Something went wrong!");
      console.error("Error creating schedule:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { activityId, day, startTime, endTime } = formData;
    if (!activityId || !day || !startTime || !endTime) {
      alert("Please fill in all fields.");
      return;
    }
    const payload = {
      ...formData,
      activityId: parseInt(activityId, 10),
      startTime: convertToISOTime(startTime),
      endTime: convertToISOTime(endTime),
      day: formData.day.toUpperCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mutate(payload);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Create Schedule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Activity Select */}
        <div>
          <label className="block text-gray-700">Activity</label>
          <select
            name="activityId"
            value={formData.activityId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          >
            <option value="">Select activity</option>
            {isLoading ? (
              <option>Loading...</option>
            ) : isError ? (
              <option>Error loading activities</option>
            ) : (
              activities.map((act) => (
                <option key={act.id} value={act.id}>
                  {act.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Day Select */}
        <div>
          <label className="block text-gray-700">Day</label>
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          >
            <option value="">Select day</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-gray-700">Start Time</label>
          <select
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          >
            <option value="">Select start time</option>
            {fixedTime.map((time, idx) => (
              <option key={time} value={time}>
                {fixedTimeAmPm[idx]}
              </option>
            ))}
          </select>
        </div>

        {/* End Time */}
        <div>
          <label className="block text-gray-700">End Time</label>
          <select
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          >
            <option value="">Select end time</option>
            {fixedTime.map((time, idx) => (
              <option key={time} value={time}>
                {fixedTimeAmPm[idx]}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSchedulePage;
