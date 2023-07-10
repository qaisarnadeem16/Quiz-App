const express = require('express');
const Quiz = require('../Model/Quiz');
const Question = require('../Model/Questions');
const router = express.Router();

router.post('/scheduleQuiz', async (req, res) => {
    try {
      const { userId, questionNo, type } = req.body;
  
      const userQuestions = await Question.find({ userId, type }).limit(parseInt(questionNo));
      if (userQuestions.length < parseInt(questionNo)) {
        return res.status(400).json({ error: `Insufficient number of ${type} questions created by the user` });
      }
  
      const quizData = req.body;
      quizData.quizQuestions = userQuestions.map(question => question._id);
  
      const quiz = new Quiz(quizData);
      const savedQuiz = await quiz.save();
  
      res.status(201).json({ message: 'Quiz created successfully', savedQuiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save Quiz' });
    }
  });


  //call all quizes
  router.get('/quizzes', async (req, res) => {
    try {
      const quizzes = await Quiz.find().sort({_id: -1});
      res.status(200).json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  });


  //register user in quiz
  router.post('/registerUser', async (req, res) => {
    try {
      const { quizId, userId } = req.body;
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      quiz.totalParticipants.push(userId);
      const updatedQuiz = await quiz.save();
  
      res.status(200).json({ message: 'User registered successfully', updatedQuiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to register user in quiz' });
    }
  });
  
  // check user already registered or not registered
  router.get('/checkRegistration/:quizId/:userId', async (req, res) => {
    try {
      const { quizId, userId } = req.params;
  
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      const isRegistered = quiz.totalParticipants.includes(userId);
      res.status(200).json({ isRegistered });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to check user registration' });
    }
  });


  // get questions from quiz
  router.get('/get-questions/:id', async (req, res) => {
    try {
      const quizId = req.params.id;
      const quiz = await Quiz.findById(quizId).populate('quizQuestions');
      
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      
      const questions = quiz.quizQuestions;
      const quizDetails = {
        id: quiz._id,
        title: quiz.title,
        prize: quiz.firstPrize,
        totalParticipants:quiz.totalParticipants
        // Include any other details you want to send
      };
  
      res.status(200).json({ quiz: quizDetails, questions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch quiz details and questions' });
    }
  });
  

  // get quiz for admin 

router.get('/adminQuizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate('userId', 'email realQzeto freeQzeto bounsQzeto firstName lastName  ')
      .sort({ _id: -1 });

    const quizDetails = quizzes.map((quiz) => ({
      id: quiz._id,
      title: quiz.title,
      type: quiz.type,
      prize: quiz.firstPrize,
      quizQuestions: quiz.quizQuestions,
      registrationFee: quiz.registrationFee,
      user: quiz.userId,
    }));
 
    res.status(200).json({ quizzes: quizDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});


  // get quiz for user 

  router.get('/getUserQuiz/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const quizzes = await Quiz.find({ userId: id })
        .populate('userId', 'email realQzeto freeQzeto bounsQzeto firstName lastName')
        .sort({ _id: -1 });
  
      const quizDetails = quizzes.map((quiz) => ({
        id: quiz._id,
        title: quiz.title,
        type: quiz.type,
        prize: quiz.firstPrize,
        quizQuestions: quiz.quizQuestions,
        registrationFee: quiz.registrationFee,
        user: quiz.userId,
      }));
  
      res.status(200).json({ quizzes: quizDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  });
  

  
  

module.exports = router;
