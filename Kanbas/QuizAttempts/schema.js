// models/attemptModel.js

const mongoose = require("mongoose");

const AttemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  userId: {
    type: String, // Adjust the type based on your user ID format
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
});

const AttemptModel = mongoose.model("Attempt", AttemptSchema);

module.exports = AttemptModel;
