import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../url";
import { useMutation } from "@tanstack/react-query";

const TrainerForm = ({ mode = "new" }) => {
  const [trainerData, setTrainerData] = useState({
    fullName: "",
    password: "",
    role: "",
    email: "",
    phoneNo: "",
    nationalIdNo: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const userType = "trainer";
    const payload = {
      ...trainerData,
    };
    console.log("payload", payload);

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.error("No user found in localStorage");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id;

    try {
      const response = await axios.post(
        `${API_URL}/users/${
          mode === "new" ? `register?userType=${userType}` : `${userId}/edit`
        }`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Trainer added/updated successfully:", response.data);
      alert("Trainer added/updated successfully");
      handleReset();
    } catch (error) {
      console.error("Error adding/updating trainer:", error);
      alert("Error adding/updating trainer");
    }
  };

  const handleReset = () => {
    setTrainerData({
      fullName: "",
      email: "",
      phoneNo: "",
      nationalIdNo: "",
    });
  };

  return (
    <div>
      <form
        action=""
        className="w-full max-w-md mx-auto bg-white p-5 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {mode === "new" ? (
          <h6 className="text-xl text-blue-400 mb-3">Add Trainer</h6>
        ) : (
          <h6 className="text-xl text-blue-400 mb-3">Edit Trainer</h6>
        )}
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={trainerData.role}
            onChange={handleChange}
            className="p-2 rounded-md border border-gray-300 focus:outline-blue-400"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="STUDENT">STUDENT</option>
            <option value="TRAINER">TRAINER</option>
          </select>
        </div>

        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={trainerData.fullName}
            onChange={handleChange}
            className="p-2 rounded-md border border-gray-300 focus:outline-blue-400"
          />
        </div>
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={trainerData.email}
            onChange={handleChange}
            className="p-2 rounded-md border border-gray-300 focus:outline-blue-400"
          />
        </div>
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="phoneNo">Phone No</label>
          <input
            type="text"
            name="phoneNo"
            id="phoneNo"
            value={trainerData.phoneNo}
            onChange={handleChange}
            className="p-2 rounded-md border border-gray-300 focus:outline-blue-400"
          />
        </div>
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="phoneNo">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Enter password"
            value={trainerData.password}
            onChange={handleChange}
            className="p-2 rounded-md border border-gray-300 focus:outline-blue-400"
          />
        </div>
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="nationalIdNo">National ID</label>
          <input
            type="text"
            name="nationalIdNo"
            id="nationalIdNo"
            value={trainerData.nationalIdNo}
            onChange={handleChange}
            className="p-2 rounded-md border border-gray-300 focus:outline-blue-400"
          />
        </div>
        <div className="flex mt-5">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {mode === "new" ? "Add Trainer" : "Update Trainer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainerForm;
