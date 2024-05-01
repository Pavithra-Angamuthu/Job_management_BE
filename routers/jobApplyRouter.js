import express from "express";
import { createJobApply, getJobApplyBasedOnOpeningId } from "../controllers/jobApplyController.js";

const jobApplyRoute = express.Router();

jobApplyRoute.post("/", createJobApply);
jobApplyRoute.get("/", getJobApplyBasedOnOpeningId);

export default jobApplyRoute;
