// dao.js for assignments
import Database from "../Database/index.js";


// Initialize assignments array if it doesn't exist
if (!Database.assignments) {
    Database.assignments = [];
  }

export function findAllAssignments() {
  return Database.assignments;
}

export const findAssignmentById = (aid) => {
    return Database.assignments.find((assignment) => assignment._id === aid);  // Changed from db to Database
};

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  try {
    // Ensure all required fields are present
    const newAssignment = {
      _id: assignment._id || new Date().getTime().toString(),
      title: assignment.title,
      description: assignment.description,
      points: assignment.points,
      due: assignment.due,
      availableFrom: assignment.availableFrom,
      availableUntil: assignment.availableUntil,
      course: assignment.course
    };
    
    // Add to database
    Database.assignments.push(newAssignment);
    console.log("Assignment added to database:", newAssignment);
    console.log("Current assignments:", Database.assignments);
    
    return newAssignment;
  } catch (error) {
    console.error("Error in createAssignment:", error);
    throw error;
  }
}


export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  if (assignment) {
    Object.assign(assignment, assignmentUpdates);
  }
  return assignment;
}