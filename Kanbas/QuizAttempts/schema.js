import mongoose from "mongoose";

// In schema.js
const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel", required: true },
    attempt: { type: Number, required: true },
    answers: { type: Map, of: String },
    score: Number,
    submittedAt: { type: Date, default: Date.now }
  },
  { collection: "quiz_attempts" }
);

export default schema;