// dao.js for enrollments
import Database from "../Database/index.js";

export function createEnrollment(enrollment) {
  const newEnrollment = { ...enrollment, _id: Date.now().toString() };
  Database.enrollments = [...Database.enrollments, newEnrollment];
  return newEnrollment;
}

export function deleteEnrollment(enrollmentId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment._id !== enrollmentId
  );
}

export function findEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findEnrollment(userId, courseId) {
  const { enrollments } = Database;
  return enrollments.find(
    (enrollment) =>
      enrollment.user === userId && enrollment.course === courseId
  );
}
