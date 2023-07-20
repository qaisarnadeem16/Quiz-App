import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../Assets/iQzeto.png';
import { HiOutlineHome } from 'react-icons/hi';
import { BsBox, BsFillBagDashFill } from 'react-icons/bs';
import { IoTimeOutline } from 'react-icons/io5';
import { AiOutlineSchedule, AiOutlineUser } from 'react-icons/ai';
import { GiWallet } from 'react-icons/gi';
import { RiUserSettingsLine } from 'react-icons/ri';
import { VscChecklist } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

const SideBar = ({ setActive, active, isSidebarVisible }) => {
    const { user } = useSelector((state) => state.user);

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? '!text-[#00459E] bg-white' : '';
    };

    return (
        <>
            <div className={`md:rounded-lg md:block bg-[#00459E] md:px-1 z-30 md:mt-2 w-[65%] md:w-[20%] md:relative absolute ${isSidebarVisible ? 'hidden' : 'block absolute'} h-screen`} id="responsiveSideBar" >

                <div className="flex justify-center py-4">
                    <Link to='/'>
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="pt-5">
                    <ul className="px-3 mx-auto flex flex-col gap-3">
                        <div onClick={() => setActive(1)}>
                            <Link to="/dashboard">
                                <li className={`text-white flex gap-2 p-2 rounded-md text-lg font-medium cursor-pointer ${isActive('/dashboard')}`}>
                                    <HiOutlineHome className="text-[1.4rem]" />
                                    Dashboards
                                </li>
                            </Link>
                        </div>

                        <div onClick={() => setActive(2)}>
                            <Link to="/dashboard/questions">
                                <li className={`text-white flex gap-2 p-2 rounded-md text-lg font-medium cursor-pointer ${isActive('/dashboard/questions')}`}>
                                    <BsBox className="text-[1.4rem]" />
                                    Question Bank
                                </li>
                            </Link>
                        </div>

                        <div onClick={() => setActive(3)}>
                            <Link to="/dashboard/QuizShedule">
                                <li className={`text-white flex gap-2 p-2 rounded-md text-lg font-medium cursor-pointer ${isActive('/dashboard/QuizShedule')}`}>
                                    <IoTimeOutline className="text-[1.4rem]" />
                                    Schedule Quiz
                                </li>
                            </Link>
                        </div>

                        <div onClick={() => setActive(4)}>
                            <Link to="/dashboard/profile">
                                <li className={`text-white flex gap-2 p-2 rounded-md text-lg font-medium cursor-pointer ${isActive('/dashboard/profile')}`}>
                                    <AiOutlineUser className="text-[1.4rem]" />
                                    Profile
                                </li>
                            </Link>
                        </div>

                        <div onClick={() => setActive(5)}>
                            <Link to="/dashboard/wallet">
                                <li className={`text-white flex gap-2 p-2 rounded-md text-lg font-medium cursor-pointer ${isActive('/dashboard/wallet')}`}>
                                    <GiWallet className="text-[1.4rem]" />
                                    Wallet
                                </li>
                            </Link>
                        </div>

                        {user.role === 'admin' ?
                            <div onClick={() => setActive(6)}>
                                <Link to="/dashboard/userManagement">
                                    <li className={`text-white flex gap-2 p-2 rounded-md text-lg font-medium cursor-pointer ${isActive('/dashboard/userManagement')}`}>
                                        <RiUserSettingsLine className="text-[1.4rem]" />
                                        User Management
                                    </li>
                                </Link>
                            </div>
                            : null}
                        {user.role === 'admin' ?
                            <div onClick={() => setActive(7)}>
                                <Link to="/dashboard/AdminQuiz">
                                    <li className={`text-white flex gap-2 p-2 rounded-md text-md font-medium cursor-pointer ${isActive('/dashboard/AdminQuiz')}`}>
                                        <AiOutlineSchedule className="text-[1.4rem]" />
                                        Admin Scheduled Quiz
                                    </li>
                                </Link>
                            </div>
                            : null}

                        {user.role === 'admin' ?
                            <div onClick={() => setActive(10)}>
                                <Link to="/dashboard/addQuizPkg">
                                    <li className={`text-white flex gap-2 p-2 rounded-md text-md font-medium cursor-pointer ${isActive('/dashboard/addQuizPkg')}`}>
                                        <AiOutlineSchedule className="text-[1.4rem]" />
                                        Add Quiz Package
                                    </li>
                                </Link>
                            </div>
                            : null}

                        <div onClick={() => setActive(11)}>
                            <Link to="/dashboard/userJoinPkg">
                                <li className={`text-white flex gap-2 p-2 rounded-md text-md font-medium cursor-pointer ${isActive('/dashboard/userJoinPkg')}`}>
                                    <BsFillBagDashFill className="text-[1.4rem]" />
                                    User Joined Package
                                </li>
                            </Link>
                        </div>

                        <div onClick={() => setActive(8)}>
                            <Link to="/dashboard/userQuiz">
                                <li className={`text-white flex gap-2 p-2 rounded-md text-md font-medium cursor-pointer ${isActive('/dashboard/userQuiz')}`}>
                                    <AiOutlineSchedule className="text-[1.4rem]" />
                                    My Scheduled Quiz
                                </li>
                            </Link>
                        </div>



                        <div onClick={() => setActive(9)}>
                            <Link to="/dashboard/playedQuiz">
                                <li className={`text-white flex gap-2 p-2 rounded-md text-md font-medium cursor-pointer ${isActive('/dashboard/playedQuiz')}`}>
                                    <VscChecklist className="text-[1.4rem]" />
                                    Played Quiz
                                </li>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SideBar;
