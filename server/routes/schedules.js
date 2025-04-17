import express from "express";
import { createSchedule, getSchedules } from "../controllers/schedules.js";

const scheduleRoutes = express.Router();

scheduleRoutes.post("/new", createSchedule);
scheduleRoutes.get("/all", getSchedules);

export default scheduleRoutes;
