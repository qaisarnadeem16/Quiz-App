import React, { useEffect, useState } from 'react'
import Dashboard from './DashBoard'
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../server';
import { useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';



const AdminQuiz = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const { user } = useSelector((state) => state.user);
    const [quizzes, SetQuizzes] = useState([]);
    const Navigate = useNavigate()
    useEffect(() => {
        fetchQuestions();
    }, []);

    // fetch all questions
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${server}/Quiz/adminQuizzes`);
            SetQuizzes(response.data.quizzes);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching quizzes');
        }
    };


    // delete a question
    const deleteQuiz = async (questionId) => {
        try {
            await axios.delete(`${server}/Quiz/deleteQuiz/${questionId}`);
            fetchQuestions(); // Fetch updated questions after deletion
            toast.success('Quiz deleted successfully');
        } catch (error) {
            toast.error(error);
        }
    };
    // edit questions
    const editQuiz = (id) => {
        Navigate(`/dashboard/editQuiz/${id}`);
    };


    const totalPages = Math.ceil(quizzes?.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = quizzes?.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <Dashboard>
            <div className="">

                <div className="w-full">
                    <div className="md:py-5 py-3 px-2">
                        <h3 className="text-[#00459E] font-[500] text-xl"> Admin Schedule Quiz </h3>

                    </div>
                    {user.role === 'admin' ?
                        <table className="w-full overflow-x-auto">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-2 text-md font-medium border">Quiz Name</th>
                                    <th className="py-2 px-2 text-md font-medium border">Quiz Creater Name</th>
                                    <th className="py-2 px-2 text-md font-medium border">Quiz Creater Earning</th>
                                    <th className="py-2 px-2 text-md font-medium border">Quiz Type</th>
                                    <th className="py-2 px-2 text-md font-medium border">Questions</th>
                                    <th className="py-2 px-2 text-md font-medium border">Registration fee</th>
                                    <th className="py-2 px-2 text-md font-medium border"></th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {currentItems.map((quiz) => (
                                    <tr key={quiz._id}>
                                        <td className="py-2 px-4 border text-left">{quiz.title}</td>
                                        <td className="py-2 px-4 border">{quiz?.user?.firstName}</td>
                                        <td className="py-2 px-4 border">{quiz?.user?.realQzeto}</td>
                                        <td className="py-2 px-4 border">{quiz.type}</td>
                                        <td className="py-2 px-4 border">{quiz.quizQuestions.length}</td>
                                        <td className="py-2 px-4 border">{quiz.registrationFee}</td>
                                        <td className="py-2 px-4 border flex gap-3">
                                            <button
                                                className="rounded-full bg-[#E32828] text-white p-1"
                                                onClick={() => deleteQuiz(quiz.id)}
                                            >
                                                <RiDeleteBin6Line />
                                            </button>

                                            <button className="rounded-full bg-[#FFB125] text-white p-1">
                                                <MdOutlineModeEditOutline onClick={() => editQuiz(quiz.id)} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        : <div className="text-black text-xl font-semibold text-center">Your Are Not Admin</div>
                    }
                </div>
            </div>

            <div className="flex justify-center mt-4 bg-[#E0DDDD] py-5">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`mx-1 py-1 px-3 rounded ${currentPage === index + 1
                            ? 'text-gray-500 bg-white border-blue-700 border-2'
                            : 'bg-white text-gray-700'
                            }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </Dashboard>
    )
}

export default AdminQuiz
