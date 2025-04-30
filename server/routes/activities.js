import express from "express";
import {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  assignActivityToStudent,
  assignActivityToTrainer,
  getActivitiesByStudentId,
  getActivitiesByTrainerId,
  deleteActivityFromStudent,
  deleteActivityFromTrainer,
  getStudentsByTrainerId,
} from "../controllers/activities.js";

const router = express.Router();

router.post("/", createActivity);
router.get("/", getAllActivities);
router.get("/:id", getActivityById);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);
router.post("/:id/assign", assignActivityToStudent);
router.post("/assign/:id", assignActivityToTrainer);
router.get("/student/:id", getActivitiesByStudentId);
router.get("/trainer/:id", getActivitiesByTrainerId);
router.delete("/remove/:studentId/:activityId", deleteActivityFromStudent);
router.delete(
  "/remove/trainer/:trainerId/:activityId",
  deleteActivityFromTrainer
);
router.get("/students/activity/:id", getStudentsByTrainerId);

export default router;
