import * as attemptsDao from "./dao.js";

export default function quizAttemptRoutes(app) {
  // Save or update a user's attempt for a quiz
  app.post("/api/attempts/:userId/:quizId", async (req, res) => {
    const { userId, quizId } = req.params;
    const { answers, score } = req.body;

    try {
      const attempt = await attemptsDao.saveAnswers(userId, quizId, answers, score);
      res.status(200).json(attempt);
    } catch (error) {
      console.error("Error saving attempt:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get a single user's attempt for a quiz
  app.get("/api/attempts/:userId/:quizId", async (req, res) => {
    const { userId, quizId } = req.params;

    try {
      const attempt = await attemptsDao.findAttemptByUserAndQuiz(userId, quizId);
      if (!attempt) {
        return res.status(404).json({ message: "No attempt found for the user and quiz" });
      }
      res.status(200).json(attempt);
    } catch (error) {
      console.error("Error fetching attempt:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get all attempts for a quiz
  app.get("/api/attempts/:quizId", async (req, res) => {
    const { quizId } = req.params;

    try {
      const attempts = await attemptsDao.findAttemptsByUserAndQuiz(req.session.userId, quizId);
      res.status(200).json(attempts);
    } catch (error) {
      console.error("Error fetching attempts:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Delete a single attempt for a user and quiz
  app.delete("/api/attempts/:userId/:quizId", async (req, res) => {
    const { userId, quizId } = req.params;

    try {
      const result = await attemptsDao.deleteAttemptByUserAndQuiz(userId, quizId);
      res.status(200).json({ message: "Attempt deleted successfully", result });
    } catch (error) {
      console.error("Error deleting attempt:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Optional: Delete all attempts for a specific quiz
  app.delete("/api/attempts/:quizId", async (req, res) => {
    const { quizId } = req.params;

    try {
      const result = await attemptsDao.deleteAllAttemptsForQuiz(quizId);
      res.status(200).json({ message: "All attempts for the quiz deleted successfully", result });
    } catch (error) {
      console.error("Error deleting attempts:", error);
      res.status(500).json({ error: error.message });
    }
  });
}
