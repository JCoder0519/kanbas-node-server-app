import mongoose from "mongoose";

const AttemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  userId: {
    type: String, // Adjust based on your user ID type
    required: true,
  },
  answers: {
    type: Map,
    of: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  maxAttempts: {
    type: Number,
    default: 3, // Default to 3 attempts globally, adjust as needed
  },
});

const AttemptModel = mongoose.model("Attempt", AttemptSchema);

export default AttemptModel;
