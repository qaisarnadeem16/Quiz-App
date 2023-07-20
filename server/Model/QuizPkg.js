const mongoose = require('mongoose');

const quizPkgSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    time: {
      type: String,
    },
    price: {
      type: String,
    },
    image: {
      type: String,
    },
    joinedUsers: [
     { type: String,}
    ],
  },
  { timestamps: true }
);

const QuizPkg = mongoose.model('QuizPackage', quizPkgSchema);

module.exports = QuizPkg;
