import mongoose from "mongoose";

// In schema.js
const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel", required: true },
    answers: { type: Map, of: String },  // Store answers as key-value pairs
    score: Number,
    savedAt: { type: Date, default: Date.now },
    isSubmitted: { type: Boolean, default: false }
  },
  { collection: "quiz_answers" }
);

export default schema;