// AssignmentsRoutes.js
import * as dao from "./dao.js"; // Data Access Object for assignments

export default function AssignmentRoutes(app) {
    
// routes.js
app.post("/api/assignments", (req, res) => {
    try {
      console.log("Received new assignment request:", req.body);
      const assignment = dao.createAssignment(req.body);
      console.log("Created assignment:", assignment);
      res.json(assignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ 
        error: "Failed to create assignment",
        details: error.message 
      });
    }
  });



  // Retrieve all assignments
  app.get("/api/assignments", (req, res) => {
    const assignments = dao.findAllAssignments();
    res.send(assignments);
  });

  // Retrieve an assignment by ID
  app.get("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    res.send(assignment);
  });

  // Update an assignment
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const updatedAssignment = dao.updateAssignment(assignmentId, req.body);
    res.send(updatedAssignment);
  });

  // Delete an assignment
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.send(status);
  });
}
