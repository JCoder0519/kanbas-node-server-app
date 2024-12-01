import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel", required: true },
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel" },
        answer: [String], // Multiple answers for multiple-choice questions
      },
    ],
    savedAt: { type: Date, default: Date.now },
  },
  { collection: "quiz_answers" }
);

export default schema;
