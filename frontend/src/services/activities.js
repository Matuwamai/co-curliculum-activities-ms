import api from "./api";

export const fetchActivities = async () => {
  try {
    const { data } = await api.get(`/activities`);
    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const fetchActivityById = async (id) => {
  try {
    const { data } = await api.get(`/activities/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const createActivity = async (activityData) => {
  try {
    const { data } = await api.post(`/activities/`, activityData);
    return data;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const updateActivity = async (id, activityData) => {
  try {
    const { data } = await api.put(`/activities/${id}`, activityData);
    return data;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const assignActivityToStudent = async ({ studentId, activityId }) => {
  const response = await api.post(`activities/${studentId}/assign`, {
    studentId,
    activityId,
  });
  return response.data;
};

export const fetchActivitiesByStudentId = async (studentId) => {
  console.log("Fetching activities for student:", studentId);
  try {
    const { data } = await api.get(`activities/student/${studentId}`);
    return data;
  } catch (error) {
    console.error("Error fetching activities for student:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const removeActivityFromStudent = async (studentId, activityId) => {
  try {
    const response = await api.delete(
      `activities/remove/${studentId}/${activityId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing activity from student:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};
