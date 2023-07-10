const ErrorHandler = require("../Utils/ErrorHandler")
const jwt=require('jsonwebtoken')
const User = require('../Model/UserModel')


exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    try {
      if (!token) {
        throw new ErrorHandler("Please login to continue", 401);
      }
    
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
      req.user = await User.findById(decoded.id);
    
      next();
    } catch (error) {
      next(error);
    }    
};

