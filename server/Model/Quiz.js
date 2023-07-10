const mongoose = require('mongoose');
const { Types } = mongoose

const quizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    title: {
        type: String
    },
    type: {
        type: String
    },
    category: {
        type: String
    },
    registrationFee:
    {
        type: String,
        default: "free",
    },
    date: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    duration: {
        type: String
    },
    participants: {
        type: String
    },
    questionNo: {
        type: String
    },
    userCreatedQuiz: {
        type: String
    },
    
    quizQuestions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
        },
    ],
    totalParticipants: {
        type: [String], // Define participants as an array of strings
        default: [],   // Set default value as an empty array
    },
    firstPrize: {
        type: Number,
        default: 20
    },
    secondPrize: {
        type: Number,
        default: 15
    },
    thirdPrize: {
        type: Number,
        default: 10
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
