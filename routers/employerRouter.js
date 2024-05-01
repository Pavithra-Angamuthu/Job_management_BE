import express from "express";
import { createEmployer, employerLogin } from "../controllers/employerController.js";

const employerRoute = express.Router();

employerRoute.post("/", createEmployer);
employerRoute.get("/login", employerLogin);

export default employerRoute;
