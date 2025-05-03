import api from "./api";

export const createComment = async (commentData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const { data } = await api.post("/comments/new", commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating comment:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const fetchCommentByStudentId = async (studentId) => {
  console.log("Fetching comments for student ID:", studentId);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const { data } = await api.get(`comments/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log("Error fetching comments:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};
