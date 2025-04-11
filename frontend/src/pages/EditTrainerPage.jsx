import React from "react";
import PageHeader from "../components/PageHeader";
import TrainerForm from "../components/TrainerForm";
import { useParams } from "react-router";
import { fetchTrainerById } from "../services/trainer";
import { useQuery } from "@tanstack/react-query";

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
      <PageHeader btnText="Go to Trainers" btnLink="/trainers" />
      <TrainerForm mode="edit" initialData={data} id={data.id} />
    </div>
  );
};

export default EditTrainerPage;
