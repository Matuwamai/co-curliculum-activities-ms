import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  User,
  Shield,
  Mail,
  Phone,
  Lock,
  Pause,
  AlertCircle,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

const SettingsPage = () => {
  const navigate = useNavigate();
  // Get user type from localStorage or default to 'student'
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || "student"
  );
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dummy user data - would normally come from API
  const [userData, setUserData] = useState({
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    profileImage: null,
    username: "johndoe",
    password: "",
    isActive: true,
    // Student-specific fields
    parentName: "Jane Doe",
    gradeLevel: "10",
    // Trainer-specific fields
    specialization: userType === "trainer" ? "Basketball" : null,
    certification: userType === "trainer" ? "ACE Certified" : null,
  });

  const [formData, setFormData] = useState({ ...userData });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({
        ...formData,
        profileImage: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call an API to update the user
    console.log("Updated user data:", formData);
    setUserData({ ...formData });
    alert("Profile updated successfully!");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      setIsDeleting(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Account deleted");
        navigate("/login");
      }, 1500);
    }
  };

  const handlePauseAccount = () => {
    const newStatus = !formData.isActive;
    setFormData({
      ...formData,
      isActive: newStatus,
    });
    alert(`Account ${newStatus ? "activated" : "paused"} successfully`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHeader
        title="Account Settings"
        btnText="Back to Dashboard"
        btnLink={
          userType === "trainer" ? "/trainer-dashboard" : "/student-dashboard"
        }
        showBackButton={true}
      />

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
                  activeTab === "profile"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User size={16} />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
                  activeTab === "security"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Shield size={16} />
                Security
              </button>
              <button
                onClick={() => setActiveTab("danger")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
                  activeTab === "danger"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <AlertCircle size={16} />
                Danger Zone
              </button>
            </nav>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                          {formData.profileImage ? (
                            <img
                              src={URL.createObjectURL(formData.profileImage)}
                              alt="Profile"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User size={40} className="text-gray-400" />
                          )}
                        </div>
                        <label
                          htmlFor="profile-upload"
                          className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50"
                        >
                          <Upload size={16} className="text-blue-500" />
                          <input
                            id="profile-upload"
                            name="profileImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {formData.fullName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {userType === "trainer" ? "Trainer" : "Student"}
                      </p>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm flex items-center">
                        <Mail
                          size={16}
                          className="absolute left-3 text-gray-400"
                        />
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 pl-10 border"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm flex items-center">
                        <Phone
                          size={16}
                          className="absolute left-3 text-gray-400"
                        />
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 pl-10 border"
                        />
                      </div>
                    </div>

                    {/* Conditional fields based on user type */}
                    {userType === "student" && (
                      <>
                        <div>
                          <label
                            htmlFor="parentName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Parent/Guardian Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="parentName"
                              id="parentName"
                              value={formData.parentName}
                              onChange={handleChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="gradeLevel"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Grade Level
                          </label>
                          <div className="mt-1">
                            <select
                              name="gradeLevel"
                              id="gradeLevel"
                              value={formData.gradeLevel}
                              onChange={handleChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            >
                              {["9", "10", "11", "12"].map((grade) => (
                                <option key={grade} value={grade}>
                                  Grade {grade}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {userType === "trainer" && (
                      <>
                        <div>
                          <label
                            htmlFor="specialization"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Specialization
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="specialization"
                              id="specialization"
                              value={formData.specialization}
                              onChange={handleChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="certification"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Certification
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="certification"
                              id="certification"
                              value={formData.certification}
                              onChange={handleChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Change Password
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your password associated with your account.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Current Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm flex items-center">
                        <Lock
                          size={16}
                          className="absolute left-3 text-gray-400"
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          id="currentPassword"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 pl-10 border"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 text-gray-400 hover:text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm flex items-center">
                        <Lock
                          size={16}
                          className="absolute left-3 text-gray-400"
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          id="newPassword"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 pl-10 border"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm flex items-center">
                        <Lock
                          size={16}
                          className="absolute left-3 text-gray-400"
                        />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 pl-10 border"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Danger Zone Tab */}
          {activeTab === "danger" && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Account Status
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.isActive
                      ? "Your account is currently active."
                      : "Your account is currently paused."}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handlePauseAccount}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                        formData.isActive
                          ? "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
                          : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    >
                      <Pause size={16} className="mr-2" />
                      {formData.isActive ? "Pause Account" : "Activate Account"}
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-red-600">
                    Delete Account
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} className="mr-2" />
                          Delete Account
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
