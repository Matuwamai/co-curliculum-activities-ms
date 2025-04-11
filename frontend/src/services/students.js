import api from "./api";

export const fetchStudents = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const response = await api.get(`users/fetch-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        role: "STUDENT",
      },
    });

    console.log("Fetching student", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    console.log("Updating student with ID:", id);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const userType = "student";
    const { data } = await api.put(
      `/users/${id}/edit?userType=${userType}`,
      studentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating student:", error);
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const fetchStudentById = async (id) => {
  console.log("Fetching student by ID:", id);
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

export const fetchStudent = async (id) => {
  console.log("Fetch student");
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const { data } = await api.get(`/users/${id}`, {
      Authorisation: `Bearer ${token}`,
    });
    console.log("Student data:", data);
    return data;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};

export const createStudent = async (studentData) => {
  try {
    console.log(studentData);
    const userType = "student";
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const { data } = await api.post(
      `users/register?userType=${userType}`,
      studentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "An error occurred";
    throw new Error(errorMessage);
  }
};
