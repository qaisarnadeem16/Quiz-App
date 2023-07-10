import React, { useEffect, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { server } from '../../server';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const QuestionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [questions, setQuestions] = useState([]);
  const Navigate=useNavigate()
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // fetch all questions
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${server}/Question/get_questions/${user._id}`);
      setQuestions(response.data.questions);
    } catch (error) {
      toast.error(error);
    }
  };

  // delete a question
  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`${server}/Question/deleteQuestion/${questionId}`);
      fetchQuestions(); // Fetch updated questions after deletion
      toast.success('Question deleted successfully');
    } catch (error) {
      toast.error(error);
    }
  };

// edit questions
const editQuestion = (questionId) => {
    Navigate(`/dashboard/updateQuestion/${questionId}`);
  };

  //watch questions
  const watchQuestion = (questionId) => {
    Navigate(`/dashboard/checkQuestion/${questionId}`);
  };

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      <div className="p-2">
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Type</th>
                <th className="py-2 px-4 border">Question</th>
                <th className="py-2 px-4 border"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border">
                    {new Date(item.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="py-2 px-4 border">{item.category}</td>
                  <td className="py-2 px-4 border">{item.type}</td>
                  <td className="py-2 px-4 border text-left">{item.question}</td>
                  <td className="py-2 px-4 border flex gap-2 justify-center">
                    <button className="rounded-full bg-[#00459E] text-white p-1" onClick={() => watchQuestion(item._id)}>
                      <AiFillEye />
                    </button>
                    <button className="rounded-full bg-[#FFB125] text-white p-1">
                      <MdOutlineModeEditOutline onClick={() => editQuestion(item._id)} />
                    </button>
                    <button
                      className="rounded-full bg-[#E32828] text-white p-1"
                      onClick={() => deleteQuestion(item._id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center mt-4 bg-[#E0DDDD] py-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 py-1 px-3 rounded ${
              currentPage === index + 1
                ? 'text-gray-500 bg-white border-blue-700 border-2'
                : 'bg-white text-gray-700'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default QuestionTable;
