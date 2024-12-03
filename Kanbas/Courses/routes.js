import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as quizzesDao from "../Quizzes/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  // Create module for a course
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }
      const module = {
        ...req.body,
        course: courseId,
      };
      const newModule = await modulesDao.createModule(module);
      res.json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ error: "Failed to create module" });
    }
  });

  // Delete course
  app.delete("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }
      const status = await dao.deleteCourse(courseId);
      res.json(status);
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ error: "Failed to delete course" });
    }
  });

  // Get users for course
  app.get("/api/courses/:courseId/users", async (req, res) => {
    try {
      const { courseId } = req.params;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }
      const users = await enrollmentsDao.findUsersForCourse(courseId);
      res.json(users);
    } catch (error) {
      console.error("Error finding users for course:", error);
      res.status(500).json({ error: "Failed to find users" });
    }
  });

  // Create course
  app.post("/api/courses", async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      const currentUser = req.session["currentUser"];
      if (currentUser?._id && course?._id) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
      }
      res.json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ error: "Failed to create course" });
    }
  });

  // Get all courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error finding courses:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  // Update course
  app.put("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }
      const status = await dao.updateCourse(courseId, req.body);
      res.json(status);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ error: "Failed to update course" });
    }
  });

  // Get modules for course
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error("Error finding modules:", error);
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  });

  // Create assignment for course
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }
      const assignment = {
        ...req.body,
        course: courseId,
      };
      const newAssignment = await assignmentsDao.createAssignment(assignment);
      res.json(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: "Failed to create assignment" });
    }
  });

  // Get assignments for course
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }
      const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      console.error("Error finding assignments:", error);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  });

  // Create quiz for course
  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    try {
      const { courseId } = req.params;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }
      const quiz = {
        ...req.body,
        course: courseId,
      };
      const newQuiz = await quizzesDao.createQuiz(quiz);
      res.json(newQuiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ error: "Failed to create quiz" });
    }
  });

  // Get quizzes for course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    try {
      const { courseId } = req.params;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }
      const quizzes = await quizzesDao.findQuizzesForCourse(courseId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error finding quizzes:", error);
      res.status(500).json({ error: "Failed to fetch quizzes" });
    }
  });
}