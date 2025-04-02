import React, { useState } from 'react'

const TrainerForm = ({mode="new"}) => {
    const [trainerData, setTrainerData] = useState({
        fullName: "",
        email: "",
        phoneNo: "",
        nationalIdNo: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(trainerData);
        // Reset form after submission
        handleReset();
    }
    const handleReset = () => {
        setTrainerData({
            fullName: "",
            email: "",
            phoneNo: "",
            nationalIdNo: "",
        });
    }
    
  return (
    <div>
      <form action='' className='w-full max-w-md mx-auto bg-white p-5 rounded-lg shadow-md' onSubmit={handleSubmit}>
        {mode === "new" ? (
          <h6 className='text-xl text-blue-400 mb-3'>Add Trainer</h6>
        ) : (
          <h6 className='text-xl text-blue-400 mb-3'>Edit Trainer</h6>
        )}
        <div className='mb-3 flex flex-col space-y-2'>
          <label htmlFor='fullName'>Full Name</label>
          <input
            type='text'
            name='fullName'
            id='fullName'
            value={trainerData.fullName}
            onChange={handleChange}
            className='p-2 rounded-md border border-gray-300 focus:outline-blue-400'
          />
        </div>
        <div className='mb-3 flex flex-col space-y-2'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={trainerData.email}
            onChange={handleChange}
            className='p-2 rounded-md border border-gray-300 focus:outline-blue-400'
          />
        </div>
        <div className='mb-3 flex flex-col space-y-2'>
          <label htmlFor='phoneNo'>Phone No</label>
          <input
            type='text'
            name='phoneNo'
            id='phoneNo'
            value={trainerData.phoneNo}
            onChange={handleChange}
            className='p-2 rounded-md border border-gray-300 focus:outline-blue-400'
          />
        </div>
        <div className='mb-3 flex flex-col space-y-2'>
          <label htmlFor='nationalIdNo'>National ID</label>
          <input
            type='text'
            name='nationalIdNo'
            id='nationalIdNo'
            value={trainerData.nationalIdNo}
            onChange={handleChange}
            className='p-2 rounded-md border border-gray-300 focus:outline-blue-400'
          />
        </div>
        <div className='flex mt-5'>
            <button
                type='submit'
                className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200'
            >
                {mode === "new" ? "Add Trainer" : "Update Trainer"}
            </button>
        </div>
      </form>
    </div>
  );
}

export default TrainerForm