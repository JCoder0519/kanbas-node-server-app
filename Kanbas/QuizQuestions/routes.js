import * as dao from "./dao.js";
import * as questionsDao from "../QuizQuestions/dao.js";

// QuestionsRoute.js
export default function QuestionsRoute(app) {
    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
      const { quizId } = req.params;
      try {
        console.log("[DEBUG] Received request for quiz questions. QuizId:", quizId);
        
        const questions = await questionsDao.findQuestionsForQuiz(quizId);
        console.log("[DEBUG] Retrieved questions:", JSON.stringify(questions, null, 2));
        
        // Validate and ensure type exists for each question
        const validatedQuestions = questions.map(q => ({
          ...q,
          type: q.type || "Multiple Choice" // Ensure type exists
        }));
        
        res.json({ 
          questions: validatedQuestions,
          debug: {
            originalCount: questions.length,
            validatedCount: validatedQuestions.length,
            timestamp: new Date().toISOString()
          }
        });
      } catch (error) {
        console.error("[DEBUG] Error in GET /api/quizzes/:quizId/questions:", error);
        res.status(500).json({
          error: "Failed to fetch questions",
          message: error.message
        });
      }
    });
  
    // Keep other routes the same but add debug logging
    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
      try {
        console.log("[DEBUG] Creating new question. Body:", JSON.stringify(req.body, null, 2));
        const { quizId } = req.params;
        const question = {
          ...req.body,
          quiz: quizId,
          type: req.body.type || "Multiple Choice" // Ensure type is set
        };
        const newQuestion = await questionsDao.createQuestion(question);
        console.log("[DEBUG] Created new question:", JSON.stringify(newQuestion, null, 2));
        res.json(newQuestion);
      } catch (error) {
        console.error("[DEBUG] Error creating question:", error);
        res.status(500).json({
          error: "Failed to create question",
          message: error.message
        });
      }
    });


    app.get("/api/quizzes/:quizId/preview", async (req, res) => {
      try {
          const { quizId } = req.params;
          console.log("[DEBUG] Fetching quiz preview for quizId:", quizId);
  
          // Fetch questions for the quiz
          const questions = await questionsDao.findQuestionsForQuiz(quizId);
          console.log("[DEBUG] Raw Questions from Database:", JSON.stringify(questions, null, 2));
  
          // Transform questions to include required fields
          const transformedQuestions = questions.map(question => ({
              _id: question._id,
              title: question.title || '',
              question: question.question || '',
              choices: question.choices || [],
              type: question.type || 'Multiple Choice',  // Ensure type is always set
              points: question.points || '0',
              quiz: question.quiz,
              answers: Array.isArray(question.answers) ? question.answers : [] // Include answers
          }));
  
          // Log transformed questions
          console.log("[DEBUG] Sending transformed questions:", JSON.stringify(transformedQuestions, null, 2));
  
          res.json({ questions: transformedQuestions });
      } catch (error) {
          console.error("[DEBUG] Error in quiz preview:", error);
          res.status(500).json({
              error: "Failed to fetch quiz preview",
              message: error.message
          });
      }
  });
  
    
   // Add route for updating a specific question
   app.put("/api/questions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("[DEBUG] Updating question with ID:", id);
        console.log("[DEBUG] Update data:", req.body);

        const updatedQuestion = await questionsDao.updateQuestion(id, req.body);
        if (!updatedQuestion) {
            console.log("[DEBUG] Question not found with ID:", id);
            return res.status(404).json({ message: "Question not found" });
        }

        console.log("[DEBUG] Successfully updated question:", updatedQuestion);
        res.json(updatedQuestion);
    } catch (error) {
        console.error("[DEBUG] Error updating question:", error);
        res.status(500).json({
            error: "Failed to update question",
            message: error.message
        });
    }
});

// Add route for deleting a specific question
app.delete("/api/questions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("[DEBUG] Deleting question with ID:", id);

        const deletedQuestion = await questionsDao.deleteQuestion(id);
        if (!deletedQuestion) {
            console.log("[DEBUG] Question not found with ID:", id);
            return res.status(404).json({ message: "Question not found" });
        }

        console.log("[DEBUG] Successfully deleted question:", deletedQuestion);
        res.json(deletedQuestion);
    } catch (error) {
        console.error("[DEBUG] Error deleting question:", error);
        res.status(500).json({
            error: "Failed to delete question",
            message: error.message
        });
    }
});
  }
