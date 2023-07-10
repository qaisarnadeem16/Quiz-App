import React, { useEffect, useState } from 'react'
import img from '../../Assets/image 4.png';
import img2 from '../../Assets/image 4 (1).png';
import DashBoard from '../../pages/DashBoard';
import axios from 'axios';
import { server } from '../../server';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillCheckCircleFill } from 'react-icons/bs'
import cross from '../../Assets/cross.png'

const QuizResult = () => {
  const { id } = useParams();
  const [resultData, setResultData] = useState('')


  //fetch game Results
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${server}/GameResult/gameresult/${id}`);
        const data = response.data;
        setResultData(data);
        // console.log(resultData.questions.selectedAnswer);
      } catch (error) {
        toast.error(error.message); // Use error.message instead of just error
        // Handle error
      }
    };

    fetchQuestions();
  }, [id]);

  return (
    <DashBoard>
      <div className="bg-white mx-2 rounded-lg shadow-lg overflow-auto dashboard md:p-5 p-2 py-5">
        {/* top bar */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 bg-[#00459E] rounded-lg py-4 px-2">
          <div>
            <h6 className="md:text-center text-white ms-2 text-xl">{resultData?.quizId?.title}</h6>
          </div>
          <div className="flex justify-between gap-5">
            <div className="bg-white flex gap-1 items-center md:px-4 px-1 md:py-1 rounded-full">
              <img src={img} alt="" className="w-[30px]" />
              <span className="text-sm">Prize: {resultData?.quizId?.firstPrize}$</span>
            </div>
            <div className="bg-white flex gap-1 items-center md:px-4 px-1 md:py-1 rounded-full">
              <img src={img2} alt="" className="w-[30px]" />
              <span className="text-sm">Participant: {resultData?.quizId?.participants}</span>
            </div>
          </div>
        </div>


        <div className="py-5">
          <h3 className="text-xl font-medium">Performance Report</h3>
        </div>

        {/* <!-- third box --> */}
        <div className="md:bg-[#304F78] bg-white md:p-5 rounded-xl flex flex-wrap md:gap-0 gap-3">

          <div className="md:w-[60%] w-full flex gap-2 flex-wrap">

            <div className="md:w-[20%] w-[48%] py-4 px-2 flex md:flex-col gap-3 items-center bg-[#304F78] rounded-lg">
              <div className="md:w-[100px] w-[50px] md:h-[100px] h-[50px] rounded-full md:border-[7px] border-[4px] border-[#D1D1D1] flex justify-center items-center"><h3 className="md:text-4xl text-lg md:font-semibold text-[#D1D1D1]">
                {resultData.questions?.length}
              </h3></div>
              <p className="text-[#D1D1D1] w-1/2 text-center text-sm">Total Questions</p>
            </div>

            <div className="md:w-[20%] w-[48%] py-4 px-2 flex md:flex-col gap-3 items-center bg-[#304F78] rounded-lg">
              <div className="md:w-[100px] w-[50px] md:h-[100px] h-[50px] rounded-full md:border-[7px] border-[4px] border-[#FFD279] flex justify-center items-center"><h3 className="md:text-4xl text-lg md:font-semibold text-[#FFD279]">
                {resultData.questions?.length - resultData.totalNotAttempted}
              </h3></div>
              <p className="text-[#FFD279] w-1/2 text-center text-sm">Attempted Questions</p>
            </div>

            <div className="md:w-[20%] w-[48%] py-4 px-2 flex md:flex-col gap-3 items-center bg-[#304F78] rounded-lg">
              <div className="md:w-[100px] w-[50px] md:h-[100px] h-[50px] rounded-full md:border-[7px] border-[4px] border-[#66ECC4] flex justify-center items-center"><h3 className="md:text-4xl text-lg md:font-semibold text-[#66ECC4]">
                {resultData.totalScore}</h3></div>
              <p className="text-[#66ECC4] w-1/2 text-center text-sm">Correct Questions</p>
            </div>

            <div className="md:w-[20%] w-[48%] py-4 px-2 flex md:flex-col gap-3 items-center bg-[#304F78] rounded-lg">
              <div className="md:w-[100px] w-[50px] md:h-[100px] h-[50px] rounded-full md:border-[7px] border-[4px] border-[#FFB125] flex justify-center items-center"><h3 className="md:text-4xl text-lg md:font-semibold text-[#FFB125]">7th</h3></div>
              <p className="text-[#FFB125] w-1/2 text-center text-sm">Your Position</p>
            </div>
          </div>

          <div className="md:w-[40%] w-full flex md:justify-end justify-between  items-center bg-[#304F78] rounded-lg px-2 py-3">
            <p className="text-xl font-medium text-white md:hidden block">Your Score</p>

            <div className='md:border-[10px] border-[7px] border-[#32CD32] rounded-full md:w-[150px] md:h-[150px] w-[70px] h-[70px] flex items-center justify-center'>
              <div className='bg-white rounded-full md:w-[130px] md:h-[130px] w-[50px] h-[50px] flex justify-center items-center flex-col'>
                <p className="md:text-4xl text-sm md:font-semibold">{resultData.totalScore}/{resultData.questions?.length}</p>
                <p className="text-[9px] md:block hidden">Your Score</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5">
          <h3 className="text-xl font-medium">Submission</h3>
        </div>

        {/* <!-- fourth box  --> */}
        <div className="bg-[#FCFCFC] rounded-lg md:p-4 p-2 flex flex-col gap-3">
          {resultData.questions && resultData.questions.map((question, index) => (
            <div className={`${question.isCorrect===true ?' bg-[#E9FFE9] border border-[#68C768]': ' bg-[#FFEEE9] border border-[#C77E68]'} rounded-lg flex justify-between md:items-center items-end md:flex-row flex-col`}>
              <div className="w-full md:w-[80%] md:p-4 p-2 flex flex-col gap-3">
                <p className="md:text-lg text-md md:font-semibold text-black">QNO.1: {question.question}</p>
                <p className="md:text-lg md:font-semibold text-[#003881]">Answer: {question.selectedAnswer}</p>
              </div>
              <div className={`relative md:bottom-0 bottom-10`}>
                {question.isCorrect === true ?
                  <BsFillCheckCircleFill className='text-[#68C768] text-3xl md:me-5 me-2' /> :
                  <img src={cross} alt="" className='md:me-5 me-2' />

                }
              </div>
            </div>
          ))}
        </div>



      </div>
    </DashBoard>
  )
}

export default QuizResult
