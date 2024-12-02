import mongoose from "mongoose";
import schema from "./schema.js";

const questionModel = mongoose.model("QuestionModel", schema);

export const findQuestionsForQuiz = async (quizId) => {
  console.log("[DEBUG] Finding questions for quizId:", quizId);
  try {
    const mongoQuizId = new mongoose.Types.ObjectId(quizId);
    
    // Explicitly include all fields we need, including type
    const questions = await questionModel.find(
      { quiz: mongoQuizId },
      {
        _id: 1,
        title: 1,
        question: 1,
        choices: 1,
        type: 1,    // Make sure type is included
        points: 1,
        quiz: 1
      }
    ).lean();
    
    console.log("[DEBUG] Raw questions from DB:", JSON.stringify(questions, null, 2));
    return questions;
  } catch (error) {
    console.error("[DEBUG] Error finding questions:", error);
    throw error;
  }
};

export const createQuestion = async (question) => {
  console.log("[DEBUG] Creating question:", JSON.stringify(question, null, 2));
  try {
    // Ensure type is set
    if (!question.type) {
      question.type = "Multiple Choice";
    }
    
    // Convert quiz ID to ObjectId
    if (question.quiz) {
      question.quiz = new mongoose.Types.ObjectId(question.quiz);
    }
    
    const newQuestion = await questionModel.create(question);
    console.log("[DEBUG] Created question:", JSON.stringify(newQuestion, null, 2));
    return newQuestion;
  } catch (error) {
    console.error("[DEBUG] Error creating question:", error);
    throw error;
  }
};

export const updateQuestion = async (questionId, updates) => {
  console.log("[DEBUG] Updating question:", questionId, JSON.stringify(updates, null, 2));
  try {
    // Ensure type remains valid if being updated
    if (updates.type && !["Fill In the Blank", "Multiple Choice", "True/False"].includes(updates.type)) {
      updates.type = "Multiple Choice";
    }
    
    const updatedQuestion = await questionModel.findByIdAndUpdate(
      questionId,
      { $set: updates },
      { new: true }
    );
    console.log("[DEBUG] Updated question:", JSON.stringify(updatedQuestion, null, 2));
    return updatedQuestion;
  } catch (error) {
    console.error("[DEBUG] Error updating question:", error);
    throw error;
  }
};
