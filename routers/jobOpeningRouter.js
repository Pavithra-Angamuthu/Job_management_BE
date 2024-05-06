import express from "express";
import {
  createJobApply,
  getJobApplyBasedOnOpeningId,
} from "../controllers/jobApplyController.js";
import {
  createJobOpening,
  getJobOpening,
  getJobOpeningBasedOnEmpId,
  getJobOpeningBasedonId,
  updateJobOpening,
} from "../controllers/jobOpeningController.js";
import { verifyToken } from "../middleware/auth.js";

const jobOpeningRoute = express.Router();

jobOpeningRoute.post("/", verifyToken, createJobOpening);
jobOpeningRoute.patch("/", verifyToken, updateJobOpening);
jobOpeningRoute.get("/emp", verifyToken, getJobOpeningBasedOnEmpId);
jobOpeningRoute.get("/id", getJobOpeningBasedonId);
jobOpeningRoute.get("/seeker", getJobOpening);

export default jobOpeningRoute;
