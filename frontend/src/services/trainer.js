import api from "./api";

export const fetchTrainerById = async (id) => {
  console.log("Fetching Trainer by ID:", id);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const { data } = await api.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const fetchTrainers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) console.error("No token found in localStorage");

    const response = await api.get(`users/fetch-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        role: "TRAINER",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trainers:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const deleteTrainer = async (trainerId) => {
  try {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete a tainer? This action cannot be undone."
    );
    if (!isConfirmed) {
      return;
    } else {
      const response = await api.delete(`users/${trainerId}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error deleting trainer:", error);
    throw error;
  }
};

export const createTrainer = async (trainerData) => {
  try {
    console.log(trainerData);
    const userType = "trainer";
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const { data } = await api.post(
      `users/register?userType=${userType}`,
      trainerData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error creating trainer:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const updateTrainer = async (id, trainerData) => {
  try {
    console.log("Updating trainer with ID:", id);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const userType = "trainer";
    const { data } = await api.put(
      `/users/${id}/edit?userType=${userType}`,
      trainerData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating trainer:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};
