import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/slices/navSlices";
import { Menu, UserRound, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

const TopBar = () => {
  const dispatch = useDispatch();
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white sticky top-0 z-30 shadow-sm flex justify-between items-center p-4">
      <div className="flex items-center space-x-2 text-[#3B82F6]">
        <Menu
          className="cursor-pointer lg:hidden hover:bg-[#EFF6FF] p-1 rounded"
          size={24}
          onClick={handleSidebar}
        />
      </div>

      <div className="relative flex items-center gap-4" ref={dropdownRef}>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {user.fullName}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center border border-gray-200 p-2 rounded-full hover:bg-[#EFF6FF] transition-colors"
        >
          <UserRound size={20} className="text-gray-700" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              <p className="font-medium">{user.fullName}</p>
              <p className="text-gray-500 text-xs">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#EFF6FF] hover:text-[#3B82F6] transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
