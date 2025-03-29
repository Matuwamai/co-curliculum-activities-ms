import React from 'react'

import { Delete, Eye, Pencil } from "lucide-react";
import DataTable from '../components/DataTable';
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
    field: "nationalIdNo",
    headerName: "National ID",
    width: 150,
    renderCell: (params) => {
      return (
        <h6 className='text-gray-600 uppercase my-auto'>{params.row.nationalId}</h6>
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
    field: "activity",
    headerName: "Activity",
    width: 150,
    renderCell: (params) => {
      return <h6 className='text-gray-600 my-auto'>{params.row.activity.name}</h6>;
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

const data = [
  {
    id: 1,
    nationalId: "12345678",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNo: "0712345678",
    activity: { name: "Football" },
    createdAt: "2023-01-15T10:00:00Z",
  },
  {
    id: 2,
    nationalId: "87654321",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNo: "0723456789",
    activity: { name: "Basketball" },
    createdAt: "2023-02-20T14:30:00Z",
  },
  {
    id: 3,
    nationalId: "11223344",
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    phoneNo: "0734567890",
    activity: { name: "Tennis" },
    createdAt: "2023-03-10T09:15:00Z",
  },
  {
    id: 4,
    nationalId: "44332211",
    fullName: "Bob Brown",
    email: "bob.brown@example.com",
    phoneNo: "0745678901",
    activity: { name: "Swimming" },
    createdAt: "2023-04-05T16:45:00Z",
  },
  {
    id: 5,
    nationalId: "55667788",
    fullName: "Charlie Davis",
    email: "charlie.davis@example.com",
    phoneNo: "0756789012",
    activity: { name: "Running" },
    createdAt: "2023-05-25T11:20:00Z",
  }
]

const TrainersPage = () => {
  return (
    <div>
      <PageHeader
        title='Trainers'
        btnText='Add Trainer'
        btnLink='/trainers/new'
        placeholder='Search Trainers and enter...'
        onSubmit={() => {}}
      />
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default TrainersPage