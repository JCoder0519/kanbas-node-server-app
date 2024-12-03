import model from "./model.js";

/**
 * Finds all attempts for a specific user and quiz.
 * @param {string} userId - The ID of the user.
 * @param {string} quizId - The ID of the quiz.
 * @returns {Promise} - A promise that resolves to the found attempts.
 */
export function findAttemptsByUserAndQuiz(userId, quizId) {
  return model.find({ userId, quizId });
}

/**
 * Finds all attempts (optional).
 * Useful for debugging or admin tools.
 * @returns {Promise} - A promise that resolves to all attempts.
 */
export function findAllAttempts() {
  return model.find();
}

/**
 * Deletes a specific attempt by user and quiz.
 * @param {string} userId - The ID of the user.
 * @param {string} quizId - The ID of the quiz.
 * @returns {Promise} - A promise that resolves to the deletion result.
 */
export function deleteAttemptByUserAndQuiz(userId, quizId) {
  return model.deleteOne({ userId, quizId });
}

/**
 * Deletes all attempts for a specific quiz (optional).
 * @param {string} quizId - The ID of the quiz.
 * @returns {Promise} - A promise that resolves to the deletion result.
 */
export function deleteAllAttemptsForQuiz(quizId) {
  return model.deleteMany({ quizId });
}
