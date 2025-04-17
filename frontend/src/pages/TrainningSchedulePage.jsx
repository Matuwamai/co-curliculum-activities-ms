import React from "react";

import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";

const columns = [
  {
    field: "time",
    headerName: "Time",
    width: 250,
    renderCell: (params) => {
      return (
        <h6 className="text-gray-600 uppercase my-auto">
          {params.row.startTime} - {params.row.endTime}
        </h6>
      );
    },
  },
  {
    field: "mondaySchedule",
    headerName: "Monday",
    width: 100,
    renderCell: (params) => {
      return (
        <h6 className="text-gray-600 uppercase my-auto">
          {params.row.mondaySchedule}
        </h6>
      );
    },
  },
  {
    field: "tuesdaySchedule",
    headerName: "Tuesday",
    width: 100,
    renderCell: (params) => {
      return (
        <h6 className="text-gray-600 uppercase my-auto">
          {params.row.tuesdaySchedule}
        </h6>
      );
    },
  },
  {
    field: "wednesdaySchedule",
    headerName: "Wednesday",
    width: 100,
    renderCell: (params) => {
      return (
        <h6 className="text-gray-600 uppercase my-auto">
          {params.row.wednesdaySchedule}
        </h6>
      );
    },
  },
  {
    field: "thursdaySchedule",
    headerName: "Thursday",
    width: 100,
    renderCell: (params) => {
      return (
        <h6 className="text-gray-600 uppercase my-auto">
          {params.row.thursdaySchedule}
        </h6>
      );
    },
  },
  {
    field: "fridaySchedule",
    headerName: "Friday",
    width: 100,
    renderCell: (params) => {
      return (
        <h6 className="text-gray-600 uppercase my-auto">
          {params.row.fridaySchedule}
        </h6>
      );
    },
  },
];

const data = [
  {
    id: 1,
    startTime: "08:00 AM",
    endTime: "09:00 AM",
    mondaySchedule: "Yoga",
    tuesdaySchedule: "Cardio",
    wednesdaySchedule: "Strength Training",
    thursdaySchedule: "Pilates",
    fridaySchedule: "Zumba",
  },
  {
    id: 2,
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    mondaySchedule: "HIIT",
    tuesdaySchedule: "Boxing",
    wednesdaySchedule: "CrossFit",
    thursdaySchedule: "Spin Class",
    fridaySchedule: "Aerobics",
  },
  {
    id: 3,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    mondaySchedule: "Meditation",
    tuesdaySchedule: "Running",
    wednesdaySchedule: "Circuit Training",
    thursdaySchedule: "Dance",
    fridaySchedule: "Swimming",
  },
];

const TrainningSchedulePage = () => {
  return (
    <div>
      <PageHeader
        title="Trainning Schedules"
        btnText="Add Schedule"
        btnLink="/trainning-schedules/create"
      />
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default TrainningSchedulePage;
