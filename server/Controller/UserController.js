const express = require('express');
const User = require('../Model/UserModel');
const ErrorHandler = require('../Utils/ErrorHandler');
const router = express.Router();
const sendToken = require('../Utils/jwtToken');
const { isAuthenticated } = require('../Middleware/auth');
const { upload } = require('../multer');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');




// API for creating users
router.post('/create-user', async (req, res, next) => {
  try {
    const { firstName, middleName, lastName, username, email, password, confirmPassword, address, city, state } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      firstName,
      middleName,
      lastName,
      username,
      email,
      password,
      address,
      city,
      state,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error in Sign up User' });
  }
});


//login the user
router.post('/login-user', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    sendToken(user, 201, res);

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));

  }
})


// getuser
router.get("/getuser", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id }); // Update the parameter to be an object with the filter criteria

    if (!user) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



// Update user data
router.put('/updateUser', async (req, res , next) => {
  const { currentPassword, newPassword, firstName, lastName, userName, email, address, city, state } = req.body;

  try {
    // Find the user by userId
    const user = await User.findOne({ email }).select("+password");


    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update the user data
    user.firstName = firstName;
    user.lastName = lastName;
    user.userName = userName;
    user.email = email;
    user.address = address;
    user.city = city;
    user.state = state;

     // Check if newPassword is provided
     if (newPassword) {
      const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }

      // Hash the new password and update user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }
    // Save the updated user
    await user.save();

    res.status(200).json({ success: true, message: 'User data updated successfully' });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, 500));

  }
});



// update user profile pic

router.put('/update-profilePic', upload.single('profilePic'), async (req, res, next) => {
  try {
    const { userId } = req.body;
    const existsUser = await User.findById(userId);

    if (!existsUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if the user has a profile picture to delete
    if (existsUser.profilePic) {
      const existAvatarPath = `uploads/${existsUser.profilePic}`;
      fs.unlinkSync(existAvatarPath);
    }

    const fileUrl = path.join(req.file.filename);

    existsUser.profilePic = fileUrl;
    await existsUser.save();

    res.status(200).json({
      success: true,
      user: existsUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});



// get all users
router.get('/getAllUsers', async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));

  }
});


// logout  
router.get('/logout'  , async(req, res, next)=>{
  try {
    res.cookie("token", null ,{
      expiresIn: new Date(0),
      httpOnly: true
    })

    res.status(201).json({
      success: true,
      message:" log out successfully"
    })
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})




module.exports = router;
