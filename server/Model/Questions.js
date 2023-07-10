const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  question: {
    type: String
  },
  correctAnswer: {
    type: String
  },
  optionA: {
    type: String
  },
  optionB: {
    type: String
  },
  optionC: {
    type: String
  },
  optionD: {
    type: String
  },
  category: {
    type: String
  },
  type: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Questions = mongoose.model('Question', questionSchema);

module.exports = Questions;
