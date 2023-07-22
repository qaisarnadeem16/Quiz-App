require('dotenv').config();
const connectDB=require('./db/Database')
const express=require('express')
const cookieParser = require('cookie-parser');
const app= express()
const port = process.env.PORT || 8000;
const cors = require("cors");

// connect to database
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
      origin: ["https://quizapp-black.vercel.app"],
      credentials: true,
    })
);
    next();
});
  app.use("/", express.static("uploads"));
app.listen(port , ()=>{
    console.log(`listening on port ${port}`)
})
app.get('/' , (req ,res)=>{
  res.json("Hello api")
})
// call api 
const user= require('./Controller/UserController')
const Question= require('./Controller/Questions');
const ErrorHandler = require('./Utils/ErrorHandler');
const Quiz = require('./Controller/Quiz');
const GameResult = require('./Controller/Game');
const QuizPkg = require('./Controller/QuizPkg');

app.use("/api/v2/user" , user)
app.use("/api/v2/Question" , Question)
app.use("/api/v2/Quiz" , Quiz)
app.use("/api/v2/GameResult" , GameResult)
app.use("/api/v2/QuizPkg" , QuizPkg)

// it's for ErrorHandling
app.use(ErrorHandler);
