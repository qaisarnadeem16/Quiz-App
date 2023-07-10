const express = require('express');
const Questions = require('../Model/Questions');
const router = express.Router();

router.post('/createQuestion' , async(req , res) => {
  try {
    const Question= new Questions(req.body);
    const save=await Question.save();
    res.status(201).json({ message: 'Question created successfully', save });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save MCQ.' });
  }
})


// api for get all question 
router.get('/get_questions/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const questions = await Questions.find({ userId: id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching questions' });
  }
});



// DELETE route for deleting a question
router.delete('/deleteQuestion/:questionId', async (req, res) => {
  const { questionId } = req.params;
  try {
    await Questions.findByIdAndDelete(questionId);

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting the question' });
  }
});


//fetch a question by its id
router.get('/getQuestion/:id', async (req, res ,next) => {
  try {
    const { id } = req.params;
    const question = await Questions.findById(id);

    if (!question) {
      return next(new ErrorHandler(error.message, 500));
    }

    res.status(200).json({ question });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));

    // console.error(error);
    // res.status(500).json({ message: 'Error fetching question' });
  }
});

// update question 
router.put('/updateQuestion/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      question,
      correctAnswer,
      optionA,
      optionB,
      optionC,
      optionD,
    } = req.body;

    const updatedQuestion = await Questions.findByIdAndUpdate(
      id,
      {
        question,
        correctAnswer,
        optionA,
        optionB,
        optionC,
        optionD,
      },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating question' });
  }
});




  module.exports =router