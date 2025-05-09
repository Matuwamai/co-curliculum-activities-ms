import React from "react";
import PageHeader from "../components/PageHeader";
import StudentForm from "../components/StudentForm";
import { useParams } from "react-router";
import { fetchStudentById } from "../services/students";
import { useQuery } from "@tanstack/react-query";
import ViewActivity from "../components/ViewActivity";

const EditStudentPage = () => {
  const { id } = useParams();

  const { isPending, isError, data } = useQuery({
    queryKey: ["student", Number(id)],
    queryFn: () => fetchStudentById(Number(id)),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading student</div>;
  }

  return (
    <div>
      <PageHeader btnText="Go to Students" btnLink="/students" />
      <div className="flex gap-6">
        <div className="w-1/2">
          <StudentForm mode="edit" initialData={data} id={data.id} />
        </div>
        <div className="w-1/2 border-l-2 border-gray-300 pl-4 mt-7">
          <ViewActivity userType="student" />
        </div>
      </div>
    </div>
  );
};

export default EditStudentPage;
