import React, { useState } from "react";
import {
  FiMenu,
  FiBell,
  FiMessageSquare,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const TrainerHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dummy trainer data
  const trainer = {
    name: "Coach Rombo",
    avatar: "https://cdn-icons-png.flaticon.com/512/7915/7915522.png",
    role: "Head Coach",
  };

  const handleSignOut = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section - Branding and navigation */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FiMenu className="h-6 w-6" />
            </button>

            {/* Logo/Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/trainer-dashboard" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                  SA
                </div>
                <span className="ml-3 text-xl font-bold text-gray-800 hidden sm:block">
                  E-Sports Academy
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                to="/dashboard"
                className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/schedule"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Schedule
              </Link>
              <Link
                to="/students"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Students
              </Link>
              <Link
                to="/reports"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Reports
              </Link>
            </nav>
          </div>

          {/* Right section - Profile and notifications */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-4">
              {/* Notification icon */}
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative">
                <FiBell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Messages icon */}
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative">
                <FiMessageSquare className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500"></span>
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="user-menu"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={trainer.avatar}
                        alt={trainer.name}
                      />
                      <div className="ml-2 hidden md:block text-left">
                        <p className="text-sm font-medium text-gray-700">
                          {trainer.name}
                        </p>
                        <p className="text-xs text-gray-500">{trainer.role}</p>
                      </div>
                      <FiChevronDown
                        className={`ml-1 text-gray-400 transition-transform duration-200 ${
                          isProfileOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                </div>

                {/* Profile dropdown menu */}
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">
                        {trainer.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {trainer.role}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiUser className="mr-2" /> Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiSettings className="mr-2" /> Settings
                    </Link>
                    <Link
                      onClick={handleSignOut}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                    >
                      <FiLogOut className="mr-2" /> Sign out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/schedule"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Schedule
            </Link>
            <Link
              to="/students"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Students
            </Link>
            <Link
              to="/reports"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Reports
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={trainer.avatar}
                  alt={trainer.name}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {trainer.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {trainer.role}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                to="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Settings
              </Link>
              <Link
                onClick={handleSignOut}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TrainerHeader;
