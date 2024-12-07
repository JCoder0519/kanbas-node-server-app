import model from "./model.js";

export default function QuizRoutes(app) {
  // Fetch Previous Attempts for a Quiz
  app.get('/api/quizzes/:quizId/attempts', async (req, res) => {
    try {
      const { quizId } = req.params;
      const userId = req.session?.currentUser?._id;

      if (!userId) {
        return res.status(401).json({ message: 'User must be logged in' });
      }

      const attempts = await model.find({ quiz: quizId, user: userId })
        .sort({ attempt: -1 })
        .select('attempt score submittedAt answers'); // Added answers to selection

      res.json(attempts);
    } catch (error) {
      console.error('Error fetching quiz attempts:', error);
      res.status(500).json({ message: 'Failed to fetch quiz attempts' });
    }
  });

  // Save a New Quiz Attempt
  app.post('/api/quizzes/:quizId/attempts', async (req, res) => {
    try {
      const { quizId } = req.params;
      const userId = req.session?.currentUser?._id;
      const { answers, score } = req.body;

      if (!userId) {
        return res.status(401).json({ message: 'User must be logged in' });
      }

      const attempt = await model.create({
        user: userId,
        quiz: quizId,
        attempt: (await model.countDocuments({ quiz: quizId, user: userId })) + 1,
        answers,
        score,
        submittedAt: new Date(),
      });

      res.status(201).json(attempt);
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
      res.status(500).json({ message: 'Failed to save quiz attempt' });
    }
  });


  app.get('/api/quizzes/:quizId/attempts/latest', async (req, res) => {
    try {
      const { quizId } = req.params;
      const userId = req.session?.currentUser?._id;
  
      if (!userId) {
        return res.status(401).json({ message: 'User must be logged in' });
      }
  
      // Fetch the latest attempt for the user and quiz
      const latestAttempt = await model
        .findOne({ quiz: quizId, user: userId })
        .sort({ attempt: -1 }) // Sort by attempt number in descending order
        .limit(1);
  
      res.json(latestAttempt);
    } catch (error) {
      console.error('Error fetching latest quiz attempt:', error);
      res.status(500).json({ message: 'Failed to fetch latest quiz attempt' });
    }
  });
  
}

