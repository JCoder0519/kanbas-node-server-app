// EnrollmentRoutes.js
import * as dao from "./dao.js"; // Enrollment DAO

export default function EnrollmentRoutes(app) {
  // Enroll a user in a course
  app.post("/api/enrollments", (req, res) => {
    const enrollment = dao.createEnrollment(req.body);
    res.send(enrollment);
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
