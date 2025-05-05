import api from "./api";

export const createAnnouncement = async (announcementData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const { data } = await api.post("/announcements/new", announcementData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating announcement:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const fetchAnnouncementsByActivityId = async (activityId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const { data } = await api.get(`/announcements/${activityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched announcements:", data);
    return data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};
