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
    const formattedData = data.map((item) => {
      const formatTime = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      };
      return {
        ...item,
        startTime: formatTime(item.startTime),
        endTime: formatTime(item.endTime),
        day: item.day.toUpperCase(),
      };
    });
    return formattedData;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};
