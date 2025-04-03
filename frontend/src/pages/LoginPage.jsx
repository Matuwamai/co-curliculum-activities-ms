import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../url';
import { useAuthStore } from '../stores/authStore';

const LoginPage = () => {
  const {login} = useAuthStore((state) => state);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  const loginMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(`${API_URL}/users/login`, userData);
      return response.data;
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(userData, {
      onSuccess: (data) => {
        const { user, token } = data;
        login(user, token);
        // Redirect to the dashboard or another page
        window.location.href = '/dashboard';
      },
      onError: (error) => {
        const errorMessage = error.response ? error.response.data.message : 'An error occurred';
        setError(errorMessage);
      },
    });
  };


  return (
    <div className='bg-blue-400 h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6 text-center text-blue-400'>Welcome Back to Sports Academy</h2>
        <p className='text-gray-600 mb-4 text-center'>Please login to your account</p>
        {loginMutation.isError && (
          <div className='bg-red-200 text-red-700 p-2 rounded mb-4'>
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 font-medium mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={userData.email}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-gray-700 font-medium mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={userData.password}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            disabled={loginMutation.isPending}
            className='w-full bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;