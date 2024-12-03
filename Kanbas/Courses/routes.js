import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const newCourse = req.body;
      // Save the new course to the database (use your course model)
      const savedCourse = await dao.createCourse(newCourse);
      res.status(201).json(savedCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Failed to create course" });
    }
  });
  

  app.put("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCourse = req.body;
      
      const result = await dao.updateCourse(id, updatedCourse, { new: true });
      
      if (!result) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.json(result);
    } catch (error) {
      console.error("Error updating course:", error.message);
      res.status(500).json({ message: "Failed to update course" });
    }
  });
  

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  });

  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });


  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });


}
