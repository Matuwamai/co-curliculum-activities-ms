import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByStudentId,
} from "../controllers/comments.js";

const commentRoutes = express.Router();

commentRoutes.post("/new", createComment);
commentRoutes.get("/:studentId", getCommentsByStudentId);
commentRoutes.delete("/:commentId", deleteComment);

export default commentRoutes;
