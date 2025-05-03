import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../url";
import { useAuthStore } from "../stores/authStore";
import Message from "../components/Message";
import { FiMail, FiLock, FiLoader, FiArrowRight } from "react-icons/fi";

const LoginPage = () => {
  const { login } = useAuthStore((state) => state);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const loginMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(`${API_URL}/users/login`, userData);
      return response.data;
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    loginMutation.mutate(userData, {
      onSuccess: (data) => {
        const { user, token } = data;
        login(user, token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        if (user.role === "ADMIN") {
          window.location.href = "/dashboard";
        } else if (user.role === "TRAINER") {
          window.location.href = "/trainer-dashboard";
        } else if (user.role === "STUDENT") {
          window.location.href = "/student-dashboard";
        }
      },
      onError: (error) => {
        const res = error.response;
        console.log("Error res", res);

        if (res?.status === 401 && res?.data?.redirect) {
          const { token, userId, userType } = res.data;

          if (userType)
            localStorage.setItem("userType", userType.toLowerCase());
          if (token) localStorage.setItem("token", token);
          if (userId) localStorage.setItem("userId", userId);

          console.log("token and userId and userType", token, userId, userType);
          window.location.href = "/set-password";
        } else {
          const errorMessage = res?.data?.message;
          setError(errorMessage);
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101b4a] to-[#1a2a6c] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your Sports Academy account
          </p>
        </div>

        {loginMutation.isError && (
          <Message variant="danger" message={error} visible={true} />
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                placeholder="Email address"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-blue-500 hover:text-blue-700 transition duration-200"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          >
            {loginMutation.isPending ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <FiArrowRight
                  className={`ml-2 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </>
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>

          <div className="mt-4">
            <a
              href="/register"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Create new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
