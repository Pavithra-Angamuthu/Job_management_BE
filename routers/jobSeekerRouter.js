import express from "express";
import { createJobSeeker, jobSeekerLogin } from "../controllers/jobseekerController.js";

const jobSeekerRoute = express.Router();

jobSeekerRoute.post("/", createJobSeeker);
jobSeekerRoute.get("/login", jobSeekerLogin);

export default jobSeekerRoute;
