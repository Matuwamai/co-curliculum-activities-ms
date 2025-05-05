import React, { useState } from "react";
import {
  FiFileText,
  FiDownload,
  FiMail,
  FiPrinter,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiUser,
  FiCalendar,
  FiHome,
  FiBarChart2,
  FiSettings,
  FiBell,
} from "react-icons/fi";

const ReportComponent = () => {
  // Dummy data for reports
  const [reports, setReports] = useState([
    {
      id: 1,
      studentName: "John Doe",
      studentId: "STU001",
      date: "2023-05-15",
      title: "Mid-term Progress Report",
      content:
        "John has shown excellent progress in football skills. His passing accuracy improved from 65% to 82% over the last month.",
      performanceRating: 4.5,
      attachments: ["skills_chart.pdf"],
    },
    {
      id: 2,
      studentName: "Sarah Smith",
      studentId: "STU002",
      date: "2023-05-10",
      title: "Fitness Assessment",
      content:
        "Sarah has improved her endurance significantly. She can now run 5km in 22 minutes, down from 28 minutes last month.",
      performanceRating: 4,
      attachments: ["fitness_test_results.pdf"],
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      studentId: "STU003",
      date: "2023-05-05",
      title: "Technical Skills Evaluation",
      content:
        "Mike needs to work on his defensive positioning. His reaction time has improved but still below team average.",
      performanceRating: 3,
      attachments: ["positioning_analysis.pdf"],
    },
  ]);

  const [newReport, setNewReport] = useState({
    studentId: "",
    title: "",
    content: "",
    performanceRating: 3,
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState(reports);
  const [activeTab, setActiveTab] = useState("all");

  // Filter reports based on search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredReports(reports);
    } else {
      setFilteredReports(
        reports.filter(
          (report) =>
            report.studentName.toLowerCase().includes(term.toLowerCase()) ||
            report.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  // Filter by tab selection
  const filterByTab = (tab) => {
    setActiveTab(tab);
    if (tab === "all") {
      setFilteredReports(reports);
    } else if (tab === "recent") {
      // Filter reports from the last 7 days
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      setFilteredReports(
        reports.filter((report) => new Date(report.date) > oneWeekAgo)
      );
    }
  };

  // Create new report
  const handleCreateReport = () => {
    const newReportObj = {
      id: reports.length + 1,
      studentName: "New Student", // In real app, get from studentId
      studentId: newReport.studentId,
      date: new Date().toISOString().split("T")[0],
      title: newReport.title,
      content: newReport.content,
      performanceRating: newReport.performanceRating,
      attachments: [],
    };
    setReports([...reports, newReportObj]);
    setFilteredReports([...reports, newReportObj]);
    setNewReport({
      studentId: "",
      title: "",
      content: "",
      performanceRating: 3,
    });
    setShowCreateForm(false);
  };

  // Dummy function for sharing report
  const shareReport = (method, reportId) => {
    const report = reports.find((r) => r.id === reportId);
    alert(
      `${method === "email" ? "Emailing" : "Downloading"} report: ${
        report.title
      } for ${report.studentName}`
    );
  };

  // Dummy students for dropdown
  const students = [
    { id: "STU001", name: "John Doe" },
    { id: "STU002", name: "Sarah Smith" },
    { id: "STU003", name: "Mike Johnson" },
    { id: "STU004", name: "Emily Wilson" },
    { id: "STU005", name: "David Brown" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <header className="bg-white shadow-sm mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <FiFileText className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                Student Reports
              </h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-blue-600 border-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Analytics
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Settings
              </a>
            </nav>

            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">Notifications</span>
                <FiBell className="h-6 w-6" />
              </button>
              {/* User profile dropdown would go here */}
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">Student Reports</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 whitespace-nowrap"
          >
            <FiPlus className="mr-2" />
            Create Report
          </button>
        </div>
      </div>

      {/* Create Report Form */}
      {showCreateForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Create New Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newReport.studentId}
                onChange={(e) =>
                  setNewReport({ ...newReport, studentId: e.target.value })
                }
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Report title"
                value={newReport.title}
                onChange={(e) =>
                  setNewReport({ ...newReport, title: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Performance Rating
            </label>
            <div className="flex items-center">
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                className="w-full mr-4"
                value={newReport.performanceRating}
                onChange={(e) =>
                  setNewReport({
                    ...newReport,
                    performanceRating: parseFloat(e.target.value),
                  })
                }
              />
              <span className="text-lg font-medium">
                {newReport.performanceRating}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Content
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter report details..."
              value={newReport.content}
              onChange={(e) =>
                setNewReport({ ...newReport, content: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateReport}
              disabled={!newReport.studentId || !newReport.title}
              className={`px-4 py-2 rounded-lg text-white ${
                !newReport.studentId || !newReport.title
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Save Report
            </button>
          </div>
        </div>
      )}

      {/* Report Filter Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "all"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => filterByTab("all")}
        >
          All Reports
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "recent"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => filterByTab("recent")}
        >
          Recent
        </button>
      </div>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                selectedReport?.id === report.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{report.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <FiUser className="mr-1" />
                    <span className="mr-3">{report.studentName}</span>
                    <FiCalendar className="mr-1" />
                    <span>{report.date}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    {report.performanceRating} ★
                  </div>
                </div>
              </div>
              {selectedReport?.id === report.id && (
                <div className="mt-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium mb-2">Report Details</h4>
                    <p className="text-gray-700 mb-4">{report.content}</p>
                    {report.attachments && report.attachments.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">
                          Attachments
                        </h5>
                        <ul className="space-y-1">
                          {report.attachments.map((file, index) => (
                            <li
                              key={index}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              <a
                                href={`#${file}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {file}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shareReport("email", report.id);
                        }}
                        className="flex items-center px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                      >
                        <FiMail className="mr-1" /> Email
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shareReport("download", report.id);
                        }}
                        className="flex items-center px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                      >
                        <FiDownload className="mr-1" /> Download
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.print();
                        }}
                        className="flex items-center px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                      >
                        <FiPrinter className="mr-1" /> Print
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FiFileText className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No reports found
          </h3>
          <p className="mt-1 text-gray-500">
            {searchTerm
              ? "Try a different search term"
              : "No reports have been created yet"}
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            <FiPlus className="mr-2" /> Create your first report
          </button>
        </div>
      )}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-2 space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Help</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2023 Athletic Training System. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReportComponent;
