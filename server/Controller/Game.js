const express = require('express');
const GameResult = require('../Model/Game');
const router = express.Router();
const mongoose = require('mongoose');
const ErrorHandler = require('../Utils/ErrorHandler');

router.post('/storeRecord', async (req, res) => {
  try {
    const {
      userId,
      quizId,
      questions,
      totalScore,
      totalCorrectAnswers,
      totalWrongAnswers,
      totalNotAttempted,
    } = req.body;

    // Check if the game result already exists
    const existingGameResult = await GameResult.findOne({ userId, quizId });

    if (existingGameResult) {
      // Update the existing game result
      existingGameResult.questions = questions;
      existingGameResult.totalScore = totalScore;
      existingGameResult.totalCorrectAnswers = totalCorrectAnswers;
      existingGameResult.totalWrongAnswers = totalWrongAnswers;
      existingGameResult.totalNotAttempted = totalNotAttempted;

      const updatedGameResult = await existingGameResult.save();

      res.json(updatedGameResult);
    } else {
      // Create a new game result
      const gameResult = new GameResult({
        userId,
        quizId,
        questions,
        totalScore,
        totalCorrectAnswers,
        totalWrongAnswers,
        totalNotAttempted,
      });

      const savedGameResult = await gameResult.save();

      res.json(savedGameResult);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving the game result.' });
  }
});


// api for get game result
  router.get('/gameresult/:id', async (req, res) => {
    try {
      const gameResultId = req.params.id;
      const gameResult = await GameResult.findById(gameResultId).populate('quizId');
  
      if (!gameResult) {
        return res.status(404).json({ message: 'Game result not found' });
      }

      res.json(gameResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// get played quiz records

router.get('/getPlayedQuiz/:id', async (req, res , next) => {
  try {
    const id = req.params;
    const gameResult = await GameResult.find().populate('quizId');

    if (!gameResult) {
      return res.status(404).json({ message: 'Game result not found' });
    }

    res.json(gameResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

  
  
  
  
  
  module.exports = router;