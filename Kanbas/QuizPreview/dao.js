import model from "./model.js";

export function findAnswersByUserAndQuiz(userId, quizId) {
  return model.findOne({ user: userId, quiz: quizId });
}

export function saveAnswers(userId, quizId, answers) {
  return model.findOneAndUpdate(
    { user: userId, quiz: quizId },
    { answers, savedAt: new Date() },
    { upsert: true, new: true }
  );
}
