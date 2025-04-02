import React, { useState } from 'react'

const ActivityForm = ({mode="new"}) => {
    const [activityData, setActivityData] = useState({
        name: "",
        description: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivityData({
            ...activityData,
            [name]: value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(activityData);
        // Reset form after submission
        handleReset();
    }
    const handleReset = () => {
        setActivityData({
            name: "",
            description: "",
        });
    }
    
  return (
    <div>
      <form action='' className='w-full max-w-md mx-auto bg-white p-5 rounded-lg shadow-md' onSubmit={handleSubmit}>
        {mode === "new" ? (
          <h6 className='text-xl text-blue-400 mb-3'>Add Activity</h6>
        ) : (
          <h6 className='text-xl text-blue-400 mb-3'>Edit Activity</h6>
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
            className='p-2 rounded-md border border-gray-300 focus:outline-blue-400'
          ></textarea>
        </div>
        <div className='flex mt-5'>
            <button
                type='submit'
                className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200'
            >
                {mode === "new" ? "Add Activity" : "Update Activity"}
            </button>
        </div>
      </form>
    </div>
  );
}

export default ActivityForm