// dao.js
import model from "./model.js";
import mongoose from "mongoose";


export function findAllQuizzes() {
    return model.find();
}

export function findQuizById(quizId) {
  console.log("DAO findQuizById called with ID:", quizId);
  try {
      // Create a new ObjectId instance using 'new'
      const objectId = new mongoose.Types.ObjectId(quizId);
      console.log("Converted to ObjectId:", objectId);
      return model.findById(objectId);
  } catch (error) {
      console.error("Error in findQuizById:", error);
      throw error;
  }
}

export function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
}

export function createQuiz(quiz) {
    delete quiz._id;
    return model.create(quiz);
}

export function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
}

export function updateQuiz(quizId, quizUpdates) {
    return model.findByIdAndUpdate(
        { _id: quizId },
        quizUpdates,
        { new: true }
    );
}