import React, { useEffect, useState } from "react";
import { createActivity, updateActivity } from "../services/activities";
import { queryClient } from "../lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import Message from "./Message";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ActivityForm = ({ mode = "new", initialData = null, id = 0 }) => {
  const navigate = useNavigate();

  const [activityData, setActivityData] = useState({
    name: "",
    description: "",
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
      // Optionally, you can show an error message here
    },
  });

  const activityUpdateMutation = useMutation({
    mutationFn: updateActivity(id, activityData),
    onSuccess: () => {
      toast.success("Activity updated successfully");
      queryClient.invalidateQueries("activities");
      navigate("/activities");
    },
    onError: (error) => {
      console.error("Error creating activity:", error);
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
    // Handle form submission logic here
    if (mode === "new") {
      activityMutation.mutate(activityData);
      handleReset();
    }
    if (mode === "edit") {
      activityUpdateMutation.mutate(activityData);
    }
  };
  const handleReset = () => {
    setActivityData({
      name: "",
      description: "",
    });
  };

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setActivityData({
        name: initialData.name,
        description: initialData.description,
      });
    } else {
      setActivityData({
        name: "",
        description: "",
      });
    }
  }, [mode, initialData]);

  return (
    <div>
      <form
        action=''
        className='w-full max-w-md mx-auto bg-white p-5 rounded-lg shadow-md'
        onSubmit={handleSubmit}>
        {mode === "new" ? (
          <h6 className='text-xl text-blue-400 mb-3'>Add Activity</h6>
        ) : (
          <h6 className='text-xl text-blue-400 mb-3'>Edit Activity</h6>
        )}
        {(activityMutation.isError || activityUpdateMutation.isError) && (
          <Message
            variant='danger'
            message={
              activityMutation?.error?.message ||
              activityUpdateMutation?.error?.message
            }
            visible={true}
          />
        )}
        <div className='mb-3 flex flex-col space-y-2'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={activityData.name}
            onChange={handleChange}
            className='p-2 rounded-md border border-gray-300 focus:outline-blue-400'
          />
        </div>
        <div className='mb-3 flex flex-col space-y-2'>
          <label htmlFor='description'>Description</label>
          <textarea
            rows={4}
            type='text'
            name='description'
            id='description'
            value={activityData.description}
            onChange={handleChange}
            className='p-2 rounded-md border border-gray-300 focus:outline-blue-400'></textarea>
        </div>
        <div className='flex mt-5'>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200'>
            {mode === "new" ? "Add Activity" : "Update Activity"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
