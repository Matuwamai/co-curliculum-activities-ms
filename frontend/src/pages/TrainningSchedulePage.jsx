import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Delete } from "lucide-react";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import { fetchSchedules } from "../services/schedules";

const columns = [
  {
    field: "activityName",
    headerName: "Activity Name",
    width: 200,
    renderCell: (params) => (
      <span className="text-gray-700">{params.row.activityName}</span>
    ),
  },
  {
    field: "day",
    headerName: "Day",
    width: 120,
    renderCell: (params) => (
      <span className="text-gray-700">{params.row.day}</span>
    ),
  },
  {
    field: "startTime",
    headerName: "Start Time",
    width: 120,
    renderCell: (params) => (
      <span className="text-gray-700">{params.row.startTime}</span>
    ),
  },
  {
    field: "endTime",
    headerName: "End Time",
    width: 120,
    renderCell: (params) => (
      <span className="text-gray-700">{params.row.endTime}</span>
    ),
  },

  {
    field: "trainerName",
    headerName: "Trainer Name",
    width: 200,
    renderCell: (params) => (
      <span className="text-gray-700">{params.row.trainerName}</span>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
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
            <Pencil size={16} />
          </button>
          <Link
            className="border text-red-400 cursor-pointer p-2 rounded"
            to={`/students/${params.row.id}/edit`}
          >
            {" "}
            <Delete size={16} />
          </Link>
        </div>
      );
    },
  },
];

const TrainningSchedulePage = () => {
  const {
    data: schedules,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: fetchSchedules,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading schedules</div>;

  return (
    <div>
      <PageHeader
        title="Training Schedules"
        btnText="Add Schedule"
        btnLink="/trainning-schedules/create"
      />
      <DataTable data={schedules} columns={columns} />
    </div>
  );
};

export default TrainningSchedulePage;
