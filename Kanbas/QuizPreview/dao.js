import model from "./model.js";

export function findAnswersByUserAndQuiz(userId, quizId) {
  return model.find({ user: userId, quiz: quizId })
    .sort({ savedAt: -1 })
    .select('answers savedAt score')
    .lean();
}

export async function saveAnswers(userId, quizId, answers, score) {
  try {
    const savedAnswer = await model.findOneAndUpdate(
      { user: userId, quiz: quizId }, // find criteria
      {
        user: userId,
        quiz: quizId,
        answers,
        score,
        savedAt: new Date()
      },
      { 
        new: true,     // Return updated document
        upsert: true,  // Create new if not found
        runValidators: true // Run schema validations
      }
    );
    return savedAnswer;
  } catch (error) {
    console.error("Error saving answers:", error);
    throw error;
  }
}