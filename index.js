import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import { verifyToken } from "./middleware/auth.js";
import employerRoute from "./routers/employerRouter.js";
import jobSeekerRoute from "./routers/jobSeekerRouter.js";
import jobOpeningRoute from "./routers/jobOpeningRouter.js";
import jobApplyRoute from "./routers/jobApplyRouter.js";
 dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

mongoose
  // .connect(
  //   `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.ut4betn.mongodb.net/${process.env.DB_NAME}`
  //   )
  .connect(
    'mongodb+srv://pavithra:pavithra@cluster0.5vcs7dt.mongodb.net/Job_Management'
  )
  .then(() => console.log("db connected"))
  .catch((e) => console.log("error"));

app.use("/api/employer",  employerRoute);
app.use("/api/jobseeker", jobSeekerRoute);
app.use("/api/opening", jobOpeningRoute);
app.use("/api/apply",verifyToken, jobApplyRoute)

app.get("/", (req, res) => {
  res.send("server connected");
});

const port = process.env.REST_PORT || 4000;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
