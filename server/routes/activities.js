import express from "express";
import {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  assignActivityToStudent,
  getActivitiesByStudentId,
  deleteActivityFromStudent,
} from "../controllers/activities.js";

const router = express.Router();

router.post("/", createActivity);
router.get("/", getAllActivities);
router.get("/:id", getActivityById);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);
router.post("/:id/assign", assignActivityToStudent);
router.get("/student/:id", getActivitiesByStudentId);
router.delete("/remove/:studentId/:activityId", deleteActivityFromStudent);

export default router;
