import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true }, // This field must not be empty
    quiz: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "QuizModel", 
      required: true 
    },
    points: { 
      type: Number,
      default: 0
    },
    type: {
      type: String,
      enum: ["Fill In the Blank", "Multiple Choice", "True/False"],
      default: "Multiple Choice"
    },
    choices: {
      type: [String],
      default: []
    },
    answers: {
      type: [String],
      default: []
    }
  },
  { 
    collection: "questions",
    timestamps: true 
  }
);

export default schema;