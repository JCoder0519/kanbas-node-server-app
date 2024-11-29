import model from "./model.js";
import mongoose from "mongoose";


export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}

export async function enrollUserInCourse(userId, courseId) {
  // Validate and convert IDs
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new Error("Invalid user or course ID");
  }

  return model.create({
    user: new mongoose.Types.ObjectId(userId), // Correct usage of ObjectId
    course: new mongoose.Types.ObjectId(courseId), // Correct usage of ObjectId
    enrollmentDate: new Date(),
  });
}

 export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
 }
 

export async function findEnrollment(userId, courseId) {
  const enrollment = await model.findOne({ user: userId, course: courseId });
  return enrollment;
}


