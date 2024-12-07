import * as dao from "./dao.js";
import * as quizzesDao from "../Quizzes/dao.js";
import mongoose from "mongoose";

export default function QuizzesRoutes(app) {
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        delete quizUpdates._id
        const updatedQuiz = await quizzesDao.updateQuiz(quizId, quizUpdates);
        res.status(204).send(updatedQuiz);
    });

    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        await quizzesDao.deleteQuiz(quizId);
        res.sendStatus(204);
    });

     app.get("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        console.log("GET /api/quizzes/:quizId - Received quizId:", quizId);
        
        try {
            // Validate if quizId is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(quizId)) {
                console.log("Invalid ObjectId format:", quizId);
                res.status(400).json({ message: "Invalid quiz ID format" });
                return;
            }

            const quiz = await quizzesDao.findQuizById(quizId);
            console.log("Quiz found:", quiz);
            
            if (!quiz) {
                console.log("Quiz not found for ID:", quizId);
                res.status(404).json({ message: "Quiz not found" });
                return;
            }
            res.json(quiz);
        } catch (error) {
            console.error("Error in quiz route:", error);
            res.status(500).json({ message: "Error fetching quiz", error: error.message });
        }
    });

}
