import React, { useState } from "react";
import { Delete, Eye, Pencil } from "lucide-react";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "../services/activities";
import { Link } from "react-router-dom";

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
    field: "name",
    headerName: "Name",
    width: 150,
    renderCell: (params) => {
      return (
        <h6 className="text-gray-600 uppercase my-auto">{params.row.name}</h6>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
    renderCell: (params) => {
      return <p className="text-gray-600 my-auto">{params.row.description}</p>;
    },
  },
  {
    field: "numberOfStudents",
    headerName: "Number of Students",
    width: 150,
    renderCell: (params) => {
      return (
        <h6 className="text-gray-600 my-auto">{params.row.students.length}</h6>
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
          <h6 className="bg-slate-100px-2 rounded-md text-blue-300">
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
            to={`/activities/${params.row.id}/edit`}
          >
            <Pencil size={16} />
          </Link>
          <button
            className="border text-red-400 cursor-pointer p-2 rounded"
            onClick={() => {
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

const ActivitiesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error);
    return (
      <div>
        <h2 className="text-red-500">Error: {error.message}</h2>
      </div>
    );
  }
  const filteredData = data.filter((activity) =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Activity data", data);
  return (
    <div>
      <PageHeader
        title="Activities"
        btnText="Add Activity"
        btnLink="/activities/new"
        placeholder="Search Activities and enter..."
        onSubmit={handleSearch}
      />
      <DataTable data={filteredData} columns={columns} />
    </div>
  );
};

export default ActivitiesPage;
