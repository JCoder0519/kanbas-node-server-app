// routes.js
import * as dao from "./dao.js";
import model from "../QuizQuestions/model.js";

export default function PreviewRoutes(app) {
  // Fetch Quiz Preview
  app.get("/api/quizzes/:quizId/preview", async (req, res) => {
    try {
      const { quizId } = req.params;
      console.log("Fetching preview for quiz:", quizId);

      if (!quizId) {
        return res.status(400).json({ message: "Quiz ID is required" });
      }

      const questions = await model.find({ quiz: quizId });
      console.log("Found questions:", questions);

      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: "No questions found for this quiz" });
      }

      // Map questions to the expected format
      const formattedQuestions = questions.map(q => ({
        _id: q._id.toString(),
        title: q.title || 'Untitled Question',
        question: q.text || q.question,
        choices: q.choices || []
      }));

      res.json({ questions: formattedQuestions });
    } catch (error) {
      console.error("Error in quiz preview:", error);
      res.status(500).json({ message: "Server error while fetching quiz preview" });
    }
  });

  // Save Quiz Preview Answers
  app.post("/api/quizzes/:quizId/preview", async (req, res) => {
    try {
      const { quizId } = req.params;
      const { answers } = req.body;
      
      if (!quizId || !answers) {
        return res.status(400).json({ message: "Quiz ID and answers are required" });
      }

      // Get current user from session if available
      const userId = req.session?.currentUser?._id;
      if (!userId) {
        return res.status(401).json({ message: "User must be logged in" });
      }

      const savedAnswers = await dao.saveAnswers(userId, quizId, answers);
      res.json(savedAnswers);
    } catch (error) {
      console.error("Error saving quiz answers:", error);
      res.status(500).json({ message: "Failed to save answers" });
    }
  });
}