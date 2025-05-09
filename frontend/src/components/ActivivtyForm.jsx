import React, { useEffect, useState } from "react";
import { createActivity, updateActivity } from "../services/activities";
import { fetchTrainers } from "../services/trainer";
import { queryClient } from "../lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import Message from "./Message";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ActivityForm = ({ mode = "new", initialData = null, id = null }) => {
  const navigate = useNavigate();

  const { data: trainers } = useQuery({
    queryKey: ["trainers"],
    queryFn: fetchTrainers,
    staleTime: 1000 * 60 * 5,
  });

  console.log("Trainers feched in activity form:", trainers);
  const [activityData, setActivityData] = useState({
    name: "",
    description: "",
    trainerId: trainers?.[0]?.id || "",
  });

  const activityMutation = useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      toast.success("Activity created successfully");
      queryClient.invalidateQueries("activities");
      navigate("/activities");
    },
    onError: (error) => {
      console.error("Error creating activity:", error);
      toast.error(error.message || "Failed to create activity");
    },
  });

  const activityUpdateMutation = useMutation({
    mutationFn: (data) => updateActivity(id, data),
    onSuccess: () => {
      toast.success("Activity updated successfully");
      queryClient.invalidateQueries("activities");
      navigate("/activities");
    },
    onError: (error) => {
      console.error("Error updating activity:", error);
      toast.error(error.message || "Failed to update activity");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData({
      ...activityData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate data before submission
    if (!activityData.name || !activityData.description) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (mode === "new") {
      activityMutation.mutate(activityData);
      handleReset();
    } else if (mode === "edit" && id) {
      // Ensure id exists for edit mode
      activityUpdateMutation.mutate(activityData);
    }
  };

  const handleReset = () => {
    setActivityData({
      name: "",
      description: "",
      trainerId: "",
    });
  };

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setActivityData({
        name: initialData.name || "",
        description: initialData.description || "",
        trainerId: initialData.trainerId || "",
      });
    }
  }, [mode, initialData]);

  return (
    <div>
      <form
        className="w-full max-w-md mx-auto bg-white p-5 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h6 className="text-xl text-blue-400 mb-3">
          {mode === "new" ? "Add Activity" : "Edit Activity"}
        </h6>

        {(activityMutation.isError || activityUpdateMutation.isError) && (
          <Message
            variant="danger"
            message={
              activityMutation.error?.message ||
              activityUpdateMutation.error?.message
            }
            visible={true}
          />
        )}

        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            name="name"
            id="name"
            value={activityData.name}
            onChange={handleChange}
            required
            className="p-2 rounded-md border border-gray-300 focus:outline-blue-400"
          />
        </div>

        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="description">Description*</label>
          <textarea
            rows={4}
            name="description"
            id="description"
            value={activityData.description}
            onChange={handleChange}
            required
            className="p-2 rounded-md border border-gray-300 focus:outline-blue-400"
          />
        </div>

        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="trainerId">Trainer</label>
          <select
            name="trainerId"
            id="trainerId"
            value={activityData.trainerId || ""}
            onChange={handleChange}
            className="p-2 rounded-md border border-gray-300 focus:outline-blue-400"
          >
            <option value="">-- Select Trainer --</option>
            {trainers?.length > 0 ? (
              trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.user?.name || trainer.fullName}
                </option>
              ))
            ) : (
              <option disabled>No trainers available</option>
            )}
          </select>
        </div>

        <div className="flex mt-5">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={
              activityMutation.isPending || activityUpdateMutation.isPending
            }
          >
            {mode === "new"
              ? activityMutation.isPending
                ? "Creating..."
                : "Add Activity"
              : activityUpdateMutation.isPending
              ? "Updating..."
              : "Update Activity"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
