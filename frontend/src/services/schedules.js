import api from "./api";

export const createSchedule = async (scheduleData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const { data } = await api.post("/schedules/new", scheduleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating schedule:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const fetchSchedules = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const { data } = await api.get("/schedules/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};
