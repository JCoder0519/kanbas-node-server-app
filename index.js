// const express = require("express");
import mongoose from "mongoose";
import "dotenv/config";
import session from "express-session";
import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameters.js";
import WorkingWithObjects from "./Lab5/WorkingWithObjects.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";



const CONNECTION_STRING = "mongodb://127.0.0.1:27017/kanbas-02-fa24";
mongoose.connect(CONNECTION_STRING);


const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}



app.use(session(sessionOptions));
app.use(express.json());

Hello(app);
Lab5(app);
PathParameters(app);
QueryParameters(app);
WorkingWithObjects(app);
WorkingWithArrays(app);
UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


