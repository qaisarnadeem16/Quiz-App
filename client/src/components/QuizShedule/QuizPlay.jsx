import React, { useEffect, useState } from 'react';
import img from '../../Assets/image 4.png';
import img2 from '../../Assets/image 4 (1).png';
import DashBoard from '../../pages/DashBoard';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../server';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";


const QuizPlay = () => {
  const { user } = useSelector((state) => state.user);
  const [selected, setSelected] = useState(0);
  const Navigate=useNavigate()
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(60);
 
  //fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${server}/Quiz/get-questions/${id}`);
        const { questions, quiz } = response.data;
        setQuestions(questions);
        setQuiz(quiz);
      } catch (error) {
        toast.error(error.message); // Use error.message instead of just error
        // Handle error
      }
    };

    fetchQuestions();
  }, [id]);

  //countdown function
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    if (countdown === 0) {
      clearInterval(countdownInterval);
      handleQuizEnd();
    }
    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown]);


  //next question
  const handleNextQuestion = () => {
    // Check if an option is selected
    if (selectedOption !== null) {
      // Check if the selected option is correct
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = currentQuestion.correctAnswer === selectedOption;

      // Update the score
      if (isCorrect) {
        setScore(score + 1);
      } else {
        console.log('');
      }

      // Move to the next question
      if (currentQuestionIndex + 1 < questions.length) {
        setSelected(0); // Reset the selected option
        setSelectedOption(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // No more questions, quiz ended
        handleQuizEnd()
      }
    }
  };

// store record of quiz
const handleQuizEnd = async () => {
  const gameResultData = {
    userId: user._id, // Replace with the actual user ID
    quizId: id,
    questions: questions.map((question) => ({
      question: question.question,
      selectedAnswer: selectedOption,
      isCorrect: selectedOption === question.correctAnswer
    })),
    totalScore: score,
    totalCorrectAnswers: score,
    totalWrongAnswers: questions.length - score,
    totalNotAttempted: questions.length - currentQuestionIndex - 1
  };

  try {
    // Send the game result to the server

    const response = await axios.post(`${server}/GameResult/storeRecord`, gameResultData);
    const savedGameResult = response.data;
     toast.success('Quiz Ended')
    
    Navigate(`/dashboard/result/${savedGameResult._id}`);
  } catch (error) {
    toast.error(error.message); // Use error.message instead of just error
    // Handle the error
  }
};



  if (questions.length === 0) {
    return <div className='text-4xl text-center text-blue-500'>Loading...</div>; // Display a loading state while fetching questions
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <DashBoard>
      <div className="bg-white mx-2 rounded-lg shadow-lg overflow-auto dashboard md:p-5 p-2 py-5">
        {/* top bar */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 bg-[#00459E] rounded-lg py-4 px-2">
          <div>
            <h6 className="md:text-center text-white ms-2 text-xl">{quiz?.title}</h6>
          </div>
          <div className="flex justify-between gap-5">
            <div className="bg-white flex gap-1 items-center md:px-4 px-1 md:py-1 rounded-full">
              <img src={img} alt="" className="w-[30px]" />
              <span className="text-sm">Prize: {quiz?.prize} $</span>
            </div>
            <div className="bg-white flex gap-1 items-center md:px-4 px-1 md:py-1 rounded-full">
              <img src={img2} alt="" className="w-[30px]" />
              <span className="text-sm">Participant: {quiz?.totalParticipants.length}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 justify-center items-center h-[70vh]">
          <div className="bg-[#F1FFFE] border border-[#77BEC8] md:w-[85%] w-full py-10 rounded-xl relative">
            <div className="absolute md:left-[50%] left-[40%] -top-7 w-[50px] h-[50px] border-2 border-red-500 bg-white rounded-full flex justify-center items-center">
              <p>{countdown}</p>
            </div>
            <h1 className="text-2xl font-[400] text-center">{currentQuestion?.question}</h1>
          </div>

          <p className="text-[#989898]">Select Correct option</p>

          <div className="my-1 w-full py-1 px-2 bg-[#00459e] text-white rounded md:hidden block">Options</div>

          <div className="md:w-[80%] w-full flex justify-center flex-wrap md:gap-8 gap-3">
            <div className={`flex w-full items-center md:w-[45%] rounded border border-gray-700 ${selected === 1 ? 'bg-green-200' : ''}`}>
              <div className="px-4 text-white py-2 bg-[#EEC907]">A</div>
              <div
                className="w-full px-2 py-2"
                onClick={() => {
                  setSelected(1);
                  setSelectedOption(questions[currentQuestionIndex]?.optionA);
                }}
              >
                {questions[currentQuestionIndex]?.optionA}
              </div>
            </div>

            <div className={`flex w-full items-center md:w-[45%] rounded border border-gray-700 ${selected === 2 ? 'bg-green-200' : ''}`}>
              <div className="px-4 text-white py-2 bg-[#32CD32]">B</div>
              <div
                className="w-full px-2 py-2"
                onClick={() => {
                  setSelected(2);
                  setSelectedOption(questions[currentQuestionIndex]?.optionB);
                }}
              >
                {questions[currentQuestionIndex]?.optionB}
              </div>
            </div>

            <div className={`flex w-full items-center md:w-[45%] rounded border border-gray-700 ${selected === 3 ? 'bg-green-200' : ''}`}>
              <div className="px-4 text-white py-2 bg-[#42BA96]">C</div>
              <div
                className="w-full px-2 py-2"
                onClick={() => {
                  setSelected(3);
                  setSelectedOption(questions[currentQuestionIndex]?.optionC);
                }}
              >
                {questions[currentQuestionIndex]?.optionC}
              </div>
            </div>

            <div className={`flex w-full items-center md:w-[45%] rounded border border-gray-700 ${selected === 4 ? 'bg-green-200' : ''}`}>
              <div className="px-4 text-white py-2 bg-[#F18507]">D</div>
              <div
                className="w-full px-2 py-2"
                onClick={() => {
                  setSelected(4);
                  setSelectedOption(questions[currentQuestionIndex]?.optionD);
                }}
              >
                {questions[currentQuestionIndex]?.optionD}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="rounded-full bg-red-600 py-2 px-4 text-white">Leave Quiz</div>
          <div className="text-gray-500">{`${currentQuestionIndex + 1}/${questions.length}`}</div>
          <button className="rounded-full bg-[#1DB95B] py-2 px-6 text-white" onClick={handleNextQuestion}>
            Next
          </button>
        </div>
      </div>
    </DashBoard>
  );
};

export default QuizPlay;
