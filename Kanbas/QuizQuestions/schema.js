import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true },
    quiz: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "QuizModel", 
      required: true 
    },
    points: { 
      type: String, 
      default: "0" 
    },
    type: {
      type: String,
      enum: ["Fill In the Blank", "Multiple Choice", "True/False"],
      default: "Multiple Choice",
      required: true  // Make sure type is required
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
    timestamps: true  // Optional: adds createdAt and updatedAt fields
  }
);

// Add middleware to ensure type is set
schema.pre('save', function(next) {
  if (!this.type) {
    this.type = 'Multiple Choice';
  }
  next();
});

export default schema;