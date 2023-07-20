const express = require('express');
const router = express.Router();
const QuizPkg = require('../Model/QuizPkg');
const { upload } = require('../multer');
const ErrorHandler = require('../Utils/ErrorHandler');
const User = require('../Model/UserModel');

// Create quiz package
router.post('/createPkg', upload.single('image'), async (req, res ,next) => {
  try {
    const { userId, title, category, time, price  } = req.body;
    const imagePath = req.file.path;

    // Create a new QuizPackage instance
    const quizPackage = new QuizPkg({
      userId,
      title,
      category,
      time,
      price,
      image: imagePath,
    });

    // Save the QuizPackage to the database
    await quizPackage.save();

    res.status(201).json({ success: true, message: 'Quiz Package created successfully' });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));

  }
});


// fetch quiz package
router.get('/getQuizPkgs', async (req, res) => {
  try {
    const quizPkgs = await QuizPkg.find();
    res.status(200).json({ success: true, quizPkgs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to fetch quiz packages' });
  }
});


// buy packages
router.post('/joinQuizPkg', async (req, res) => {
  const { userId, pkgID } = req.body;

  try {
    // Find the Quiz Package in the database
    const quizPackage = await QuizPkg.findById(pkgID);
    const user = await User.findById(userId);
 
    if (!quizPackage) {
      return res.status(404).json({ error: 'Quiz Package not found' });
    }

     // Check if the user is already joined the Quiz Package
     if (quizPackage.joinedUsers.includes(userId)) {
      return res.status(400).json({ error: 'User already joined this Quiz Package' });
    }

    if (user.realQzeto < quizPackage.price) {
      return res.status(400).json({ error: 'Insufficient balance for this Package' });
    }


    // Deduct the price from the user's balance
    user.realQzeto -= quizPackage.price;

    // Add the user to joinedUsers array
    quizPackage.joinedUsers.push(userId);

    // Save the updated user and Quiz Package
    await user.save();
    await quizPackage.save();

    return res.status(200).json({ message: 'User joined Quiz Package successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to join Quiz Package' });
  }
});


// usr joined Quiz Package
router.get('/joinedPackages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const joinedPackages = await QuizPkg.find({ joinedUsers: id });
    return res.status(200).json({ joinedPackages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch joined packages' });
  }
});







module.exports = router;
