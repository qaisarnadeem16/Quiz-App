import React, { useEffect, useState } from 'react';
import Dashboard from './DashBoard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../server';
import { useSelector } from 'react-redux';

const PlayedQuiz = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const { user } = useSelector((state) => state.user);
  const [quizzes, setQuizzes] = useState([]);
  const id = user._id;

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Fetch all played quizzes
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`${server}/GameResult/getPlayedQuiz/${id}`);
      setQuizzes(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching played quizzes');
    }
  };

  const totalPages = Math.ceil(quizzes?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = quizzes?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(quizzes)

  return (
    <Dashboard>
      <div className="">
        <div className="w-full">
          <div className="md:py-5 py-3 px-2">
            <h3 className="text-[#00459E] font-[500] text-xl">Played Quiz</h3>
          </div>
          <table className="w-full overflow-x-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-2 text-md font-medium border">Quiz Name</th>
                <th className="py-2 px-2 text-md font-medium border">Quiz Category</th>
                <th className="py-2 px-2 text-md font-medium border">Quiz Total Questions</th>
                <th className="py-2 px-2 text-md font-medium border">Attempted Question</th>
                <th className="py-2 px-2 text-md font-medium border">Wrong Question</th>
                <th className="py-2 px-2 text-md font-medium border">Correct Question</th>
                <th className="py-2 px-2 text-md font-medium border">Prize Money</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {quizzes.length === 0 ? (
                <p>No quizzes played by the user.</p>
              ) : (
                
                  quizzes.map((quiz) => (
                    <tr key={quiz._id}>
                      <td className="py-2 px-4 border text-left">{quiz.quizId.title}</td>
                      <td className="py-2 px-4 border">{quiz.quizId.category}</td>
                      <td className="py-2 px-4 border">{quiz.questions.length}</td>
                      <td className="py-2 px-4 border">{quiz.questions.length - quiz.totalNotAttempted}</td>
                      <td className="py-2 px-4 border">{quiz.totalWrongAnswers}</td>
                      <td className="py-2 px-4 border">{quiz.totalCorrectAnswers}</td>
                      <td className="py-2 px-4 border">{quiz.quizId.firstPrize}$</td>
                    </tr>
                  ))
                
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-4 bg-[#E0DDDD] py-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 py-1 px-3 rounded ${currentPage === index + 1 ? 'text-gray-500 bg-white border-blue-700 border-2' : 'bg-white text-gray-700'
              }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </Dashboard>
  );
};

export default PlayedQuiz;
