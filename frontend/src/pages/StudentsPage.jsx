import React from 'react'
import DataTable from '../components/DataTable'
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
          <h6 className='bg-slate-100px-2 rounded-md text-blue-300'>
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

const rows = [
  {
    id: 1,
    fullName: "John Doe",
    email: "johndoe@example.com",
    phoneNo: "123-456-7890",
    createdAt: "2023-01-15T10:00:00Z",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "janesmith@example.com",
    phoneNo: "987-654-3210",
    createdAt: "2023-02-20T14:30:00Z",
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    email: "alicej@example.com",
    phoneNo: "555-123-4567",
    createdAt: "2023-03-10T08:15:00Z",
  },
  {
    id: 4,
    fullName: "Bob Brown",
    email: "bobbrown@example.com",
    phoneNo: "444-987-6543",
    createdAt: "2023-04-05T16:45:00Z",
  },
  {
    id: 5,
    fullName: "Charlie Davis",
    email: "charlied@example.com",
    phoneNo: "333-222-1111",
    createdAt: "2023-05-25T12:00:00Z",
  },
];


const StudentsPage = () => {

  return (
    <div>
      <PageHeader
        title='Students'
        btnText='Add Student'
        btnLink='/students/new'
        placeholder='Search Student by name and enter...'
        onSubmit={() => {}}
      />
      <DataTable data={rows} columns={columns} />
    </div>
  );
}

export default StudentsPage