// EnrollmentRoutes.js
import * as dao from "./dao.js"; // Enrollment DAO
import mongoose from "mongoose";

export default function EnrollmentRoutes(app) {
  // Enroll a user in a course
  app.post("/api/enrollments", async (req, res) => {
    console.log("POST /api/enrollments called");
    console.log("Request body:", req.body);
  
    try {
      const { user, course } = req.body;
  
      // Validate and convert user and course to ObjectId
      if (!mongoose.Types.ObjectId.isValid(user)) {
        console.error("Invalid user ID:", user);
        return res.status(400).send({ error: "Invalid user ID format" });
      }
      if (!mongoose.Types.ObjectId.isValid(course)) {
        console.error("Invalid course ID:", course);
        return res.status(400).send({ error: "Invalid course ID format" });
      }
  
      const enrollment = await dao.enrollUserInCourse(user, course);
      console.log("Enrollment created:", enrollment);
      res.status(201).send(enrollment);
    } catch (error) {
      console.error("Error in POST /api/enrollments:", error.message);
      res.status(500).send({ error: error.message });
    }
  });
  

  // Unenroll a user from a course
  app.delete("/api/enrollments/:enrollmentId", (req, res) => {
    const { enrollmentId } = req.params;
    dao.deleteEnrollment(enrollmentId);
    res.sendStatus(200);
  });

  // Get enrollments for a user
  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.send(enrollments);
  });

  // Check if a user is enrolled in a course
  app.get("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.query;
    const enrollment = dao.findEnrollment(userId, courseId);
    res.send(enrollment ? enrollment : {});
  });
}
