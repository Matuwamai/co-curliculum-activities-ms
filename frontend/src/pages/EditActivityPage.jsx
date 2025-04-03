import React from "react";
import PageHeader from "../components/PageHeader";
import ActivityForm from "../components/ActivivtyForm";
import { useParams } from "react-router";
import { fetchActivityById } from "../services/activities";
import { useQuery } from "@tanstack/react-query";

const EditActivityPage = () => {
    const {id}= useParams();


    const { isPending, isError, data } = useQuery({
        queryKey: ["activity", Number(id)],
        queryFn: () => fetchActivityById(Number(id)),
    });

    if (isPending) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error loading activity</div>;
    }

    console.log("Data", data);

  return (
    <div>
      <PageHeader btnText='Go to Activities' btnLink='/activities' />
        <ActivityForm
          mode='edit'
          initialData={data}
          id={data.id}
        />
    </div>
  );
};

export default EditActivityPage;
