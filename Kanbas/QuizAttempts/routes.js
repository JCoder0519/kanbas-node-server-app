// routes.js for QuizAttempt

import * as attemptsDao from "./dao.js";

export default function quizAttemptRoutes(app) {
    // Save or update answers for a user's attempt on a quiz
    app.post("/api/attempts/:userId/:quizId", async (req, res) => {
        const { userId, quizId } = req.params;
        const { answers, score } = req.body;
        try {
            const attempt = await attemptsDao.saveAnswers(userId, quizId, answers, score);
            res.json(attempt);
        } catch (error) {
            console.error("Error saving attempt:", error);
            res.status(500).json({ error: error.message });
        }
    });

    // Get a user's attempt for a specific quiz
    app.get("/api/attempts/:userId/:quizId", async (req, res) => {
        const { userId, quizId } = req.params;
        try {
            const attempt = await attemptsDao.findAttemptByUserAndQuiz(userId, quizId);
            res.json(attempt);
        } catch (error) {
            console.error("Error fetching attempt:", error);
            res.status(500).json({ error: error.message });
        }
    });

    // Get all attempts (optional)
    app.get("/api/attempts", async (req, res) => {
        try {
            const attempts = await attemptsDao.findAllAttempts();
            res.json(attempts);
        } catch (error) {
            console.error("Error fetching attempts:", error);
            res.status(500).json({ error: error.message });
        }
    });

    // Delete an attempt (optional)
    app.delete("/api/attempts/:userId/:quizId", async (req, res) => {
        const { userId, quizId } = req.params;
        try {
            const result = await attemptsDao.deleteAttemptByUserAndQuiz(userId, quizId);
            res.json({ message: "Attempt deleted successfully", result });
        } catch (error) {
            console.error("Error deleting attempt:", error);
            res.status(500).json({ error: error.message });
        }
    });
}
