import React, { useEffect, useState } from 'react'
import DashBoard from './DashBoard'
import axios from 'axios';
import { backend_url, server } from '../server';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { BiTimeFive } from 'react-icons/bi'
import moment from 'moment';
import { BsFillBookmarkStarFill } from 'react-icons/bs'
import { FaMedal } from 'react-icons/fa'

const UserJoinPkg = () => {
    const [quizPkgs, setQuizPkgs] = useState([]);
    const { user } = useSelector((state) => state.user);


    useEffect(() => {
        const fetchQuizPkgs = async () => {
            try {
                const response = await axios.get(`${server}/QuizPkg/joinedPackages/${user._id}`);
                setQuizPkgs(response.data.joinedPackages);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchQuizPkgs();
    }, []);
    return (
        <DashBoard>
            <div className="w-full">
                <div className="md:py-5 py-3 px-2">
                    <h3 className="text-[#00459E] font-[500] text-xl"> User Joined Packages </h3>

                </div>
                <div className="py-5">
                    <div className="w-full gap-4 flex-wrap flex justify-center">
                        {quizPkgs.map((quizPkg) => {
                            const targetDate = moment(quizPkg.time);
                            const now = moment();
                            const duration = moment.duration(targetDate.diff(now));
                            const months = duration.months();
                            const days = duration.days();
                            const hours = duration.hours();
                            const minutes = duration.minutes();

                            return (
                                <div className="md:px-4 md:w-[30%] w-full" key={quizPkg._id}>
                                    <div className="flex flex-col border border-gray-200">
                                        <div className="relative">
                                            <img src={`${backend_url}${quizPkg.image}`} alt="" />

                                            <div className=" w-/2 absolute bottom-2 right-2 flex gap-3 items-center">

                                                <div className="w-[30px] h-[30px] rounded-full bg-[rgb(254,214,25)] flex justify-center items-center"><BsFillBookmarkStarFill /></div>
                                                <div className="w-[30px] h-[30px] rounded-full bg-[rgb(254,214,25)] flex justify-center items-center"><FaMedal /></div>

                                                <div className="bg-[#282C46] rounded-md px-2 py-1 text-white flex gap-1 items-center">
                                                    <BiTimeFive className="text-white" />

                                                    {months > 0 && (
                                                        <div>
                                                            {months}m {days}d {hours}h {minutes}m
                                                        </div>
                                                    )}
                                                    {months === 0 && days > 0 && (
                                                        <div>
                                                            {days}d {hours}h {minutes}m
                                                        </div>
                                                    )}
                                                    {months === 0 && days === 0 && hours > 0 && (
                                                        <div>
                                                            {hours}h {minutes}m
                                                        </div>
                                                    )}
                                                    {months === 0 && days === 0 && hours === 0 && (
                                                        <div>{minutes}m</div>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="p-5 flex flex-col gap-5">
                                            <div className="bg-purple-500 py-2 px-3 w-1/2 text-center text-white text-lg">
                                                {quizPkg.category}
                                            </div>
                                            <h3 className="text-xl font-medium">{quizPkg.title}</h3>
                                        </div>
                                        <div className="border border-gray-200 p-2 flex justify-between px-5">
                                            <h3 className="text-2xl font-semibold">${quizPkg.price}</h3>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </DashBoard>
    )
}

export default UserJoinPkg
