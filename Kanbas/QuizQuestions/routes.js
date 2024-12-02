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
      
          const questions = await questionsDao.findQuestionsForQuiz(quizId);
          
          // Transform questions to include type and ensure all required fields
          const transformedQuestions = questions.map(question => ({
            _id: question._id,
            title: question.title || '',
            question: question.question || '',
            choices: question.choices || [],
            type: question.type || 'Multiple Choice',  // Ensure type is always set
            points: question.points || '0',
            quiz: question.quiz
          }));
      
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
    
    // Keep other routes...
  }
