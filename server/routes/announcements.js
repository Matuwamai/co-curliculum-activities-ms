import express from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncementsByActivityId,
} from "../controllers/announcements.js";

const announcementRoutes = express.Router();

announcementRoutes.post("/new", createAnnouncement);
announcementRoutes.get("/:activityId", getAnnouncementsByActivityId);
announcementRoutes.delete("/:commentId", deleteAnnouncement);

export default announcementRoutes;
