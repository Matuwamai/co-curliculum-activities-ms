import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../url";
import DataTable from "../components/DataTable";
import { useMutation } from "@tanstack/react-query";
import { Delete, Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import { fetchStudents } from "../services/students";
import { Loader2 } from "lucide-react";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteStudent = async (studentId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this student? This action cannot be undone."
      );
      if (!isConfirmed) return;

      await axios.delete(`${API_URL}/users/${studentId}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Student deleted successfully");
      return studentId;
    } catch (error) {
      toast.error("Error deleting student. Please try again.");
      console.error("Error deleting student:", error);
      throw error;
    }
  };

  const deleteStudentMutation = useMutation({
    mutationFn: handleDeleteStudent,
    onSuccess: (studentId) => {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );
    },
  });

  const fetchStudentsMutation = useMutation({
    mutationFn: fetchStudents,
    onSuccess: (data) => {
      setStudents(data);
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error fetching students:", error);
      setLoading(false);
    },
  });

  useEffect(() => {
    fetchStudentsMutation.mutate();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      field: "id",
      headerName: "S/NO",
      width: 80,
      renderCell: (params) => (
        <span className="text-gray-600 text-sm">{params.row.id}</span>
      ),
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 150,
      renderCell: (params) => (
        <span className="text-gray-600 text-sm">{params.row.fullName}</span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => (
        <span className="text-gray-600 text-sm truncate">
          {params.row.email}
        </span>
      ),
    },
    {
      field: "phoneNo",
      headerName: "Phone No",
      width: 130,
      renderCell: (params) => (
        <span className="text-gray-600 text-sm">{params.row.phoneNo}</span>
      ),
    },
    {
      field: "parentName",
      headerName: "Parent",
      width: 150,
      renderCell: (params) => (
        <span className="text-gray-600 text-sm">
          {params.row.student?.parentName || "N/A"}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date Joined",
      width: 150,
      renderCell: (params) => {
        const formattedDate = new Date(params.row.createdAt).toLocaleDateString(
          "en-GB",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        );
        return (
          <span className="text-[#3B82F6] bg-[#EFF6FF] px-2 py-1 rounded-md text-xs">
            {formattedDate}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <Link
            to={`/students/${params.row.id}`}
            className="p-2 text-[#3B82F6] hover:bg-[#EFF6FF] rounded transition-colors"
          >
            <Eye size={16} />
          </Link>
          <Link
            to={`/students/${params.row.id}/edit`}
            className="p-2 text-[#10B981] hover:bg-[#ECFDF5] rounded transition-colors"
          >
            <Pencil size={16} />
          </Link>
          <button
            onClick={() => deleteStudentMutation.mutate(params.row.id)}
            className="p-2 text-[#EF4444] hover:bg-[#FEE2E2] rounded transition-colors"
          >
            <Delete size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#3B82F6]" size={32} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Students"
        btnText="Add Student"
        btnLink="/students/new"
        placeholder="Search students..."
        onSubmit={(query) => setSearchQuery(query)}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <DataTable
          data={filteredStudents}
          columns={columns}
          loading={loading}
          noDataMessage="No students found"
        />
      </div>
    </div>
  );
};

export default StudentsPage;
