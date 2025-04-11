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

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteStudent = async (studentId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this student? This action cannot be undone."
      );
      if (!isConfirmed) {
        return;
      } else {
        const response = await axios.delete(
          `${API_URL}/users/${studentId}/delete`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Student deleted successfully");
        return response.data;
      }
    } catch (error) {
      toast.error("Error deleting student. Please try again.");
      console.error("Error deleting student:", error);
      throw error;
    }
  };
  const deleteStudentMutation = useMutation({
    mutationFn: handleDeleteStudent,
    onSuccess: (studentId) => {
      mutation.mutate();
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );
      console.log(`User with ID ${studentId} deleted successfully`);
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });

  const mutation = useMutation({
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
    mutation.mutate();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "S/NO",
      width: 100,
      renderCell: (params) => {
        return (
          <h6 className="text-gray-600 uppercase my-auto">{params.row.id}</h6>
        );
      },
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 150,
      renderCell: (params) => {
        return <h6 className="text-gray-600 my-auto">{params.row.fullName}</h6>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => {
        return <h6 className="text-gray-600 my-auto">{params.row.email}</h6>;
      },
    },
    {
      field: "phoneNo",
      headerName: "Phone No",
      width: 150,
      renderCell: (params) => {
        return <h6 className="text-gray-600 my-auto">{params.row.phoneNo}</h6>;
      },
    },
    {
      field: "parentName",
      headerName: "Parent Name",
      width: 150,
      renderCell: (params) => {
        return (
          <h6 className="text-gray-600 my-auto">{params.row.parentName}</h6>
        );
      },
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
          <div className="">
            <h6 className="bg-slate-100 px-2 rounded-md text-blue-300">
              {formattedDate}
            </h6>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex space-x-2 items-center h-full">
            <button
              className="border text-blue-400 cursor-pointer p-2 rounded"
              onClick={() => {
                // Handle delete action
                console.log(`View user with ID: ${params.row.id}`);
              }}
            >
              <Eye size={16} />
            </button>
            <Link
              className="border text-green-400 cursor-pointer p-2 rounded"
              to={`/students/${params.row.id}/edit`}
            >
              {" "}
              <Pencil size={16} />
            </Link>
            <button
              className="border text-red-400 cursor-pointer p-2 rounded"
              onClick={() => {
                deleteStudentMutation.mutate(params.row.id);
                // Handle delete action
                console.log(`Delete user with ID: ${params.row.id}`);
              }}
            >
              <Delete size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  if (loading) return <div>Loading...</div>;

  console.log("Edit button clicked");

  return (
    <div>
      <PageHeader
        title="Students"
        btnText="Add Student"
        btnLink="/students/new"
        placeholder="Search Student by name and enter..."
        onSubmit={() => {}}
      />
      <DataTable data={students} columns={columns} />
    </div>
  );
};

export default StudentsPage;
