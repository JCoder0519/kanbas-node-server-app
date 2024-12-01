import * as dao from "./dao.js";
import * as assignmentsDao from "../Assignments/dao.js";

export default function AssignmentRoutes(app) {
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
        res.sendStatus(204);
    });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        assignmentsDao.deleteAssignment(assignmentId);
        res.sendStatus(204);
    });

    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        try {
          const { courseId } = req.params;
          const assignment = { ...req.body, course: courseId };
          console.log("Creating assignment:", assignment);
          
          // Create the assignment using your DAO
          const newAssignment = await assignmentsDao.createAssignment(assignment);
          console.log("Created assignment:", newAssignment);
          
          res.json(newAssignment);
        } catch (error) {
          console.error("Error creating assignment:", error);
          res.status(500).json({ error: "Failed to create assignment" });
        }
      });
}
