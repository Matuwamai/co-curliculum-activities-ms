import {
  CalendarCheck2,
  GraduationCap,
  LayoutDashboard,
  ScissorsLineDashed,
  SquareActivity,
} from "lucide-react";

export const sideLinks = [
  {
    id: 0,
    url: "/dashboard",
    iconClass: () => <LayoutDashboard />,
    title: "Dashboard",
  },
  {
    id: 1,
    url: "/activities",
    iconClass: () => <SquareActivity />,
    title: "Activities",
  },
  {
    id: 2,
    url: "/students",
    iconClass: () => <GraduationCap />,
    title: "Students",
  },
  {
    id: 3,
    url: "/trainers",
    iconClass: () => <ScissorsLineDashed />,
    title: "Trainers",
  },
  {
    id: 4,
    url: "/trainning-schedules",
    iconClass: () => <CalendarCheck2 />,
    title: "Schedules",
  },
];
