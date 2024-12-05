import * as dao from "./dao.js";
import model from "../QuizQuestions/model.js";

export default function PreviewRoutes(app) {
  // Fetch Quiz Preview
  app.get("/api/quizzes/:quizId/preview", async (req, res) => {
    try {
      const { quizId } = req.params;

      if (!quizId) {
        return res.status(400).json({ message: "Quiz ID is required" });
      }

      const questions = await model.find({ quiz: quizId })
        .select('_id title text question choices type points answers');

      if (!questions?.length) {
        return res.status(404).json({ message: "No questions found for this quiz" });
      }

      const formattedQuestions = questions.map(q => ({
        _id: q._id.toString(),
        title: q.title || 'Untitled Question',
        question: q.text || q.question,
        choices: q.choices || [],
        type: q.type,
        points: q.points,
        answers: q.answers
      }));

      res.json({ questions: formattedQuestions });
    } catch (error) {
      console.error("Error in quiz preview:", error);
      res.status(500).json({ message: "Server error while fetching quiz preview" });
    }
  });

  // Fetch Previous Attempts - Fixed route
  // In routes.js
  app.get("/api/quizzes/:quizId/preview/attempts", async (req, res) => {
    try {
      const { quizId } = req.params;
      const userId = req.session?.currentUser?._id;

      if (!userId) {
        return res.status(401).json({ message: "User must be logged in" });
      }

      const attempts = await dao.findAnswersByUserAndQuiz(userId, quizId);
      res.json(attempts || []);
    } catch (error) {
      console.error("Error fetching attempts:", error);
      res.status(500).json({ message: "Failed to fetch attempts" });
    }
  });

  // Save Quiz Preview Answers
  app.post("/api/quizzes/:quizId/preview", async (req, res) => {
    try {
        const { quizId } = req.params;
        const answerData = req.body;
        const userId = req.session?.currentUser?._id;

        console.log("Received preview save request:", {
            quizId,
            userId,
            answerData
        });

        if (!userId) {
            return res.status(401).json({ 
                message: "User must be logged in to save answers" 
            });
        }

        if (!quizId) {
            return res.status(400).json({ 
                message: "Quiz ID is required" 
            });
        }

        const savedAnswer = await dao.saveAnswers(
            userId,
            quizId,
            answerData.answers,
            answerData.score
        );

        console.log("Saved answer:", savedAnswer); // Debug log

        res.json(savedAnswer);
    } catch (error) {
        console.error("Error saving quiz preview:", error);
        res.status(500).json({ 
            message: "Failed to save quiz preview answers",
            error: error.message 
        });
    }
});
}