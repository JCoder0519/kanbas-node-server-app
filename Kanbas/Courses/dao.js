import model from "./model.js";


export function findAllCourses() {
  return model.find();
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}

export function createCourse(course) {
  delete course._id;
  return model.create(course);
  // const newCourse = { ...course, _id: Date.now().toString() };
  // Database.courses = [...Database.courses, newCourse];
  // return newCourse;
 }
 

 export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
 }
 
 export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  // const { courses } = Database;
  // const course = courses.find((course) => course._id === courseId);
  // Object.assign(course, courseUpdates);
  // return course;
 }
 