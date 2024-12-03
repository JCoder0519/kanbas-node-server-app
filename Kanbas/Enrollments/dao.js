import model from "./model.js";
import mongoose from "mongoose";

export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}

export async function unenrollUserInCourse(user, course) {
  const result = await model.deleteOne({ user: user, course: course });
  if (result.deletedCount > 0) {
    return 200
  } else {
    return 500
  }
}

export async function findCoursesForUser(userId) {
  const objectIdUser = mongoose.Types.ObjectId.isValid(userId)
    ? mongoose.Types.ObjectId.createFromHexString(userId)
    : userId;
  const enrollments = await model.find({ user: objectIdUser }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export function findAllEnrollments() {
  model.find()
}

export const findUsersForCourse = async (courseId) => {
  try {
      // Convert courseId to ObjectId if it's a valid hex string
      const objectIdCourse = mongoose.Types.ObjectId.isValid(courseId)
          ? mongoose.Types.ObjectId.createFromHexString(courseId)
          : courseId;

      // Find enrollments for the course and populate the user details
      const enrollments = await model
          .find({ course: objectIdCourse })
          .populate({
              path: "user",
              select: "firstName lastName username email role section totalActivity lastActivity"
          })
          .exec();

      // Extract and return just the user objects
      return enrollments.map(enrollment => enrollment.user);
  } catch (error) {
      console.error("Error in findUsersForCourse DAO:", error);
      throw error;
  }
};