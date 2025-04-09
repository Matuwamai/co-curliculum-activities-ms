import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { API_URL } from '../url';
import DataTable from '../components/DataTable';
import { useMutation } from '@tanstack/react-query';
import { Delete, Eye, Pencil } from "lucide-react";
import PageHeader from '../components/PageHeader';

const columns = [
  {
    field: "id",
    headerName: "S/NO",
    width: 100,
    renderCell: (params) => {
      return (
        <h6 className='text-gray-600 uppercase my-auto'>{params.row.id}</h6>
      );
    },
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 150,
    renderCell: (params) => {
      return <h6 className='text-gray-600 my-auto'>{params.row.fullName}</h6>;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
    renderCell: (params) => {
      return <h6 className='text-gray-600 my-auto'>{params.row.email}</h6>;
    },
  },
  {
    field: "phoneNo",
    headerName: "Phone No",
    width: 150,
    renderCell: (params) => {
      return <h6 className='text-gray-600 my-auto'>{params.row.phoneNo}</h6>;
    },
  },
  {
    field: "parentName",
    headerName: "Parent Name",
    width: 150,
    renderCell: (params) => {
      return <h6 className='text-gray-600 my-auto'>{params.row.parentName}</h6>;
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
        <div className=''>
          <h6 className='bg-slate-100 px-2 rounded-md text-blue-300'>
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
        <div className='flex space-x-2 items-center h-full'>
          <button
            className='border text-blue-400 cursor-pointer p-2 rounded'
            onClick={() => {
              // Handle delete action
              console.log(`View user with ID: ${params.row.id}`);
            }}>
            <Eye size={16} />
          </button>
          <button
            className='border text-green-400 cursor-pointer p-2 rounded'
            onClick={() => {
              // Handle delete action
              console.log(`Delete user with ID: ${params.row.id}`);
            }}>
            <Pencil size={16} />
          </button>
          <button
            className='border text-red-400 cursor-pointer p-2 rounded'
            onClick={() => {
              // Handle delete action
              console.log(`Delete user with ID: ${params.row.id}`);
            }}>
            <Delete size={16} />
          </button>
        </div>
      );
    },
  },
];

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    const response = await axios.get(`${API_URL}/users/fetch-users`, {
            headers: {
              Authorization: `Bearer ${token}`,
      }
    });
    console.log("Fetching student", response.data);
    return response.data;
  }

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
  }
  , []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <PageHeader
        title='Students'
        btnText='Add Student'
        btnLink='/students/new'
        placeholder='Search Student by name and enter...'
        onSubmit={() => {}}
      />
      <DataTable data={students} columns={columns} />
    </div>
  );
}

export default StudentsPage