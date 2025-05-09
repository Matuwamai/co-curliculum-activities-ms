import api from "./api";

export const fetchStudentsByTrainerId = async (userId) => {
  try {
    const { data } = await api.get(
      `activities/students/activity/${userId}?userId=${userId}`
    );
    console.log("Fetched students by trainer ID:", data);
    return data;
  } catch (error) {
    console.error("Error fetching students by trainer ID:", error);
    throw error;
  }
};
