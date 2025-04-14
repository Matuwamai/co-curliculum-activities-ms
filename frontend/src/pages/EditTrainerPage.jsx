import React from "react";
import PageHeader from "../components/PageHeader";
import TrainerForm from "../components/TrainerForm";
import { useParams } from "react-router";
import { fetchTrainerById } from "../services/trainer";
import { useQuery } from "@tanstack/react-query";
import ViewActivity from "../components/ViewActivity";

const EditTrainerPage = () => {
  const { id } = useParams();

  const { isPending, isError, data } = useQuery({
    queryKey: ["trainer", Number(id)],
    queryFn: () => fetchTrainerById(Number(id)),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading trainer</div>;
  }

  return (
    <div>
      <div>
        <PageHeader btnText="Go to Students" btnLink="/trainers" />
        <div className="flex gap-6">
          <div className="w-1/2">
            <TrainerForm mode="edit" initialData={data} id={data.id} />
          </div>
          <div className="w-1/2 border-l-2 border-gray-300 pl-4 mt-7">
            <ViewActivity userType="trainer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTrainerPage;
