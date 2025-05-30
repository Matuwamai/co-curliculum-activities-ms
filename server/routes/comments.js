import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByStudentId,
  getCommentsByActivityId,
  getTrainerByTrainerId,
  getCommentsByTrainerId,
} from "../controllers/comments.js";

const commentRoutes = express.Router();

commentRoutes.post("/new", createComment);
commentRoutes.get("/:userId", getCommentsByStudentId);
commentRoutes.get("/activities/:activityId", getCommentsByActivityId);
commentRoutes.get("/trainer/:trainerId", getTrainerByTrainerId);
commentRoutes.get("/trainer/comments/:trainerId", getCommentsByTrainerId);
commentRoutes.delete("/:commentId", deleteComment);

export default commentRoutes;
