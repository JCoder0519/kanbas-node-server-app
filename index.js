import express from 'express';
import Lab5 from './Lab5/index.js';
import Hello from './Hello.js';
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import mongoose from "mongoose";


const CONNECTION_STRING = "mongodb://127.0.0.1:27017/kanbas-02-fa24"
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

if (process.env.NODE_ENV === "development") {
  sessionOptions.cookie = {
    sameSite: "lax", // Allow cookies in development
    secure: false,   // Cookies don't require HTTPS in development
  };
} else {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none", // For cross-origin requests
    secure: true,     // Requires HTTPS
    domain: process.env.REMOTE_SERVER,
  };
}


app.use(session(sessionOptions));



app.use(express.json());

Hello(app);
// Register Lab5 routes
Lab5(app);
CourseRoutes(app);
UserRoutes(app);

ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


