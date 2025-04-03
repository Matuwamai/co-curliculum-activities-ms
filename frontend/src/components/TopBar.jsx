import React from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/slices/navSlices";
import { Menu, UserRound } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

const TopBar = () => {
  const dispatch = useDispatch();
  const {user, logout} = useAuthStore();

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  }
  return (
    <>
      <header className='bg-white sticky top-0 z-30 shadow-sm flex justify-between md:items-center p-4 big-screen-top'>
        <div className='flex items-center space-x-2 text-blue-400 '>
          <Menu className='cursor-pointer lg:hidden' onClick={handleSidebar} />
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex space-x-2 items-center'>
            <h4 className='my-0'>{user.fullName}</h4>
            <button className='bg-blue-200 text-blue-500 px-4 py-1 rounded-full cursor-pointer' onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className='border border-gray-300 p-2 rounded-full'>
            <UserRound size={24} className='text-gray-700 cursor-pointer' />
          </div>
        </div>
      </header>
    </>
  );
};

export default TopBar;
