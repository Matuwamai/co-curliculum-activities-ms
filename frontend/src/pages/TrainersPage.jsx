import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Delete, Eye, Pencil } from "lucide-react";
import DataTable from "../components/DataTable";
import { fetchTrainers, deleteTrainer } from "../services/trainer";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router";

const TrainersPage = () => {
  const [trainers, setTrainers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const deleteTrainerMutation = useMutation({
    mutationFn: deleteTrainer,
    onSuccess: (trainerId) => {
      mutation.mutate();
      setTrainers((prevTrainers) =>
        prevTrainers.filter((trainer) => trainer.id !== trainerId)
      );
      console.log(`User with ID ${trainerId} deleted successfully`);
    },
    onError: (error) => {
      console.error("Error deleting Trainer:", error);
    },
  });

  const mutation = useMutation({
    mutationFn: fetchTrainers,
    onSuccess: (data) => {
      console.log("Fetched trainers:", data);
      setTrainers(data);
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error fetching trainers:", error);
      setLoading(false);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  if (loading) return <div>Loading...</div>;

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
      field: "nationalIdNo",
      headerName: "National ID",
      width: 150,
      renderCell: (params) => {
        return (
          <h6 className="text-gray-600 uppercase my-auto">
            {params.row.trainer.nationalIdNo}
          </h6>
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
      field: "activity",
      headerName: "Activity",
      width: 150,
      renderCell: (params) => {
        return <h6 className="text-gray-600 my-auto">{params.row.activity}</h6>;
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
              to={`/trainers/${params.row.id}/edit`}
              className="border text-blue-400 cursor-pointer p-2 rounded"
            >
              <Pencil size={16} />
            </Link>
            <button
              className="border text-red-400 cursor-pointer p-2 rounded"
              onClick={() => {
                deleteTrainerMutation.mutate(params.row.id);
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

  return (
    <div>
      <PageHeader
        title="Trainers"
        btnText="Add Trainer"
        btnLink="/trainers/new"
        placeholder="Search Trainers and enter..."
        onSubmit={() => {}}
      />
      <DataTable data={trainers} columns={columns} />
    </div>
  );
};

export default TrainersPage;
