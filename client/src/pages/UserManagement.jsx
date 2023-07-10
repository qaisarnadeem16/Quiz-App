import React, { useEffect, useState } from 'react'
import Dashboard from './DashBoard'
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../server';




const UserManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const [users, SetUsers] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    // fetch all questions
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${server}/user/getAllUsers`);
            // console.log(response.data); // Check the received data in the console
            SetUsers(response.data.users);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching users');
        }
    };





    const totalPages = Math.ceil(users?.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users?.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // console.log(users)
    return (
        <Dashboard>
            <div className="">
                <div className="w-full">
                    <table className="w-full overflow-x-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-2 text-md font-medium border">User Id</th>
                                <th className="py-2 px-2 text-md font-medium border">User Name</th>
                                <th className="py-2 px-2 text-md font-medium border">Email</th>
                                <th className="py-2 px-2 text-md font-medium border">Real Qzeto Balance</th>
                                <th className="py-2 px-2 text-md font-medium border">Free Qzeto Balance</th>
                                <th className="py-2 px-2 text-md font-medium border">Bouns Qzeto Balance</th>
                                <th className="py-2 px-2 text-md font-medium border">First Name</th>
                                <th className="py-2 px-2 text-md font-medium border">last Name</th>
                                <th className="py-2 px-2 text-md font-medium border">City</th>
                                <th className="py-2 px-2 text-md font-medium border">State</th>
                            </tr>
                        </thead>
                            <tbody className="text-center">
                                {currentItems.map((item) => (
                                    <tr key={item._id}>
                                        <td className="py-2 px-4 border">{item._id}</td>
                                        <td className="py-2 px-4 border">{item.userName}</td>
                                        <td className="py-2 px-4 border">{item.email}</td>
                                        <td className="py-2 px-4 border">{item.realQzeto}</td>
                                        <td className="py-2 px-4 border">{item.freeQzeto}</td>
                                        <td className="py-2 px-4 border">{item.bounsQzeto}</td>
                                        <td className="py-2 px-4 border">{item.firstName}</td>
                                        <td className="py-2 px-4 border">{item.lastName}</td>
                                        <td className="py-2 px-4 border">{item.city}</td>
                                        <td className="py-2 px-4 border">{item.state}</td>
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

export default UserManagement
