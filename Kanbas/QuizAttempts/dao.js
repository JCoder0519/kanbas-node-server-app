// daos/attemptDao.js

import model from "./model.js"; // This imports the Attempt model

/**
 * Finds a single attempt by a user for a specific quiz.
 * @param {string} userId - The ID of the user.
 * @param {string} quizId - The ID of the quiz.
 * @returns {Promise} - A promise that resolves to the found attempt.
 */
export function findAttemptByUserAndQuiz(userId, quizId) {
  return model.findOne({ userId: userId, quizId: quizId });
}

/**
 * Saves or updates the answers for a user's attempt on a quiz.
 * If an attempt already exists for the user and quiz, it updates it.
 * Otherwise, it creates a new attempt.
 * @param {string} userId - The ID of the user.
 * @param {string} quizId - The ID of the quiz.
 * @param {object} answers - An object containing the user's answers.
 * @param {number} score - The user's score for the attempt.
 * @returns {Promise} - A promise that resolves to the saved attempt.
 */
export function saveAnswers(userId, quizId, answers, score) {
  return model.findOneAndUpdate(
    { userId: userId, quizId: quizId },
    { answers, score, date: new Date() },
    { upsert: true, new: true }
  );
}
