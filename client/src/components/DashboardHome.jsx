import React, { useEffect, useState } from 'react'
import Statistics from './Layout/Statistics'
import QuizCard from './Layout/QuizCard'
import axios from 'axios'
import { server } from '../server'
import DashBoard from '../pages/DashBoard'

// const cardData=[{
//   QuizName: 'This will be the quiz name in 2 lines',
//   pkg:'free',
//   startTimeDate:'2023-06-19',
//   endTimeDate:'2023-06-22',
//   totalQuestions:10,
//   joinUsers:20,
//   firstPrize:56,
//   secondPrize:20,
//   thirdPrize:10
// },
// {
//   QuizName: 'This will be the quiz name in 2 lines',
//   pkg:'free',
//   startTimeDate:'2023-06-19',
//   endTimeDate:'2023-06-22',
//   totalQuestions:10,
//   joinUsers:20,
//   firstPrize:56,
//   secondPrize:20,
//   thirdPrize:10
// },
// {
//   QuizName: 'This will be the quiz name in 2 lines',
//   pkg:'paid',
//   startTimeDate:'2023-06-19',
//   endTimeDate:'2023-06-22',
//   totalQuestions:10,
//   joinUsers:20,
//   firstPrize:56,
//   secondPrize:20,
//   thirdPrize:10
// },
// {
//   QuizName: 'This will be the quiz name in 2 lines',
//   pkg:'free',
//   startTimeDate:'2023-06-19',
//   endTimeDate:'2023-06-22',
//   totalQuestions:10,
//   joinUsers:20,
//   firstPrize:56,
//   secondPrize:20,
//   thirdPrize:10
// },
// {
//   QuizName: 'This will be the quiz name in 2 lines',
//   pkg:'free',
//   startTimeDate:'2023-06-19',
//   endTimeDate:'2023-06-22',
//   totalQuestions:10,
//   joinUsers:20,
//   firstPrize:56,
//   secondPrize:20,
//   thirdPrize:10
// }
// ]
const DashboardHome = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setQuizzes]);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`${server}/Quiz/quizzes`);

      setQuizzes(response.data);
      // console.log(quizzes);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <DashBoard>
    <div>
      <Statistics />

      <div className="bg-[#E0DDDD] py-5 flex flex-wrap gap-5">
        {quizzes.map((cardData) => (
          <QuizCard key={cardData._id}
            _id={cardData._id}
            QuizName={cardData.title}
            pkg={cardData.registrationFee}
            startTimeDate={cardData.startTime}
            endTimeDate={cardData.endTime}
            totalQuestions={cardData.questionNo}
            joinUsers={cardData.participants}
            firstPrize={cardData.firstPrize}
            secondPrize={cardData.secondPrize}
            thirdPrize={cardData.thirdPrize}
          />
        ))}

      </div>
    </div>
    </DashBoard>
  )
}

export default DashboardHome
