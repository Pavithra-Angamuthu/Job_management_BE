import express from "express";
import { createJobApply, getJobApplyBasedOnOpeningId } from "../controllers/jobApplyController.js";
import { createJobOpening, getJobOpening, getJobOpeningBasedOnEmpId, updateJobOpening } from "../controllers/jobOpeningController.js";

const jobOpeningRoute = express.Router();

jobOpeningRoute.post("/", createJobOpening);
jobOpeningRoute.patch("/", updateJobOpening);
jobOpeningRoute.get("/emp", getJobOpeningBasedOnEmpId);
jobOpeningRoute.get("/opening", getJobApplyBasedOnOpeningId);
jobOpeningRoute.get("/seeker", getJobOpening);

export default jobOpeningRoute;