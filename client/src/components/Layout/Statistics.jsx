import React, { useEffect, useState } from 'react'
import icon1 from '../../Assets/sTotal.png'
import icon2 from '../../Assets/sArrow.png'
import icon3 from '../../Assets/sDownload.png'
import icon4 from '../../Assets/STick.png'
import icon5 from '../../Assets/SCross.png'
import axios from 'axios';
import { server } from '../../server';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const Statistics = () => {
    const { user } = useSelector((state) => state.user);
    const [quizzes, SetQuizzes] = useState([]);
    const [playedQuiz, SetPlayedQuiz] = useState([]);
    const [question, setQuestions] = useState([]);
    const [lastUpdated, setLastUpdated] = useState('');
    const id=user._id;

    useEffect(() => {
        fetchQuiz();
        fetchPlayedQuiz();
        fetchTotalQuestion();
        setLastUpdated(new Date());
    }, []);

    // fetch all Quiz
    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`${server}/Quiz/getUserQuiz/${id}`);
            SetQuizzes(response.data.quizzes);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching quizzes');
        }
    };
// fetch the played quiz
    const fetchPlayedQuiz = async () => {
        try {
            const response = await axios.get(`${server}/GameResult/getPlayedQuiz/${id}`);
            SetPlayedQuiz(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching quizzes');
        }
    };
  // fetch total question
    const fetchTotalQuestion = async () => {
        try {
          const response = await axios.get(`${server}/Question/get_questions/${user._id}`);
          setQuestions(response.data.questions);
        } catch (error) {
          toast.error(error);
        }
      };

      const getMinutesElapsed = () => {
        const currentTime = new Date();
        const diffInMinutes = Math.round((currentTime - lastUpdated) / (1000 * 60));
        return diffInMinutes;
      };
    return (
        <>
            <div className="bg-white rounded-xl p-2">
                <div className="flex justify-between items-center">
                    <h4 className="text-[#00459E] text-lg font-normal py-1">Satatistics</h4>
                    <p className="text-gray-300 ">Updated {getMinutesElapsed()} minutes ago</p>
                </div>

                <div className="md:pt-5 pb-3 flex flex-wrap gap-9 md:gap-2 justify-between md:px-12">

                    <div className="flex gap-3 items-center">
                    <div className="bg-[#00459e] rounded-full p-3"><img src={icon1} alt="" /></div>

                        <div className="flex flex-col items-center ">
                            <p className="text-[#00459e]">{quizzes.length}</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">Shedule <br /> Quize</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="bg-[#EEC907] rounded-full p-3"><img src={icon2} alt="" /></div>
                        <div className="flex flex-col items-center ">
                            <p className="text-[#EEC907]">{playedQuiz.length}</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">Played <br /> Quize</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="bg-[#42BA96] rounded-full p-3"><img src={icon3} alt="" /></div>
                        <div className="flex flex-col items-center ">
                            <p className="text-[#42BA96]">{question.length}</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">Question <br /> Submit</p>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <div className="bg-[#32CD32] rounded-full p-2"><img src={icon4} alt="" /></div>
                        <div className="flex flex-col items-center ">
                            <p className="text-[#32CD32]">{question.length}</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">Question <br /> Approved</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="bg-[#E32828] rounded-full p-3"><img src={icon5} alt="" /></div>
                        <div className="flex flex-col items-center ">
                            <p className="text-[#E32828]">0</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">Question <br /> Reject</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Statistics
