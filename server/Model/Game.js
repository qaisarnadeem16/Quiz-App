const mongoose = require('mongoose');

const gameResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  questions: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    question: {
      type: String,
    },
    selectedAnswer: {
      type: String,
    },
    isCorrect: {
      type: Boolean,
    },
    correctAnswer: {
      type: String,
    },
  }],
  totalScore: {
    type: Number,
  },
  totalCorrectAnswers: {
    type: Number,
  },
  totalWrongAnswers: {
    type: Number,
  },
  totalNotAttempted: {
    type: Number,
  },
});

const GameResult = mongoose.model('GameResult', gameResultSchema);

module.exports = GameResult;
