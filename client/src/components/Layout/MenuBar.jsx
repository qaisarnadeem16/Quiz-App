import React, { useState } from 'react'
// import menu from '../../Assets/navbar-icon-17 1.png'
import wallet from '../../Assets/wallet.png'
import hand from '../../Assets/hand-gesture.png'
import dollar from '../../Assets/dollar.png'
// import profile from '../../Assets/Ellipse 1.png'
import { IoAddCircleSharp } from 'react-icons/io5'
import { BiTime } from 'react-icons/bi'
import { useSelector } from "react-redux";
import { CgMenuLeft } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'
import { backend_url } from '../../server'
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify'

const MenuBar = ({ onToggleSidebar, active, setActive }) => {
    const { user } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false)
    const Navigate=useNavigate()
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const handleButtonClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const LogOut = async () => {
        try {
            await axios.get(`${server}/user/logout`);
            toast.success('Logout Successfully')
            Navigate('/login')
        } catch (error) {
            toast.error(error)
        }
    };
    return (
        <>

            <div className="w-full pt-2 relative">
                <div className="flex justify-between items-center rounded-md bg-white pe-3 mx-2 py-2">
                    <div className="item pt-2">
                        <ul className="p-0 flex gap-2 md:gap-6 items-center">
                            <li className="menubtn">
                                <button className="btn md:hidden block mx-1 border-2 rounded-lg border-gray-500 p-1" onClick={onToggleSidebar}>
                                    <CgMenuLeft className='text-2xl text-gray-500' /></button>
                            </li>

                            <li className="flex gap-2 items-center">

                                <div className="" >
                                    <img src={wallet} alt="" className='w-[30px] md:w-[100%]' />
                                </div>
                                <div className="flex flex-col text-[8px] md:text-sm">
                                    <span className="">{user.realQzeto}$</span>
                                    <span className="">Real Qzeto</span>
                                </div>
                            </li>
                            <li className="flex gap-2 items-center">

                                <div className=" " >
                                    <img src={hand} alt="" className='w-[30px] md:w-[100%]' />
                                </div>
                                <div className="flex flex-col  text-[8px] md:text-sm">
                                    <span className="">{user.freeQzeto}$</span>
                                    <span className="">Free Qzeto</span>
                                </div>
                            </li>
                            <li className="flex gap-2 items-center">
                                <div className=" text-dark text-wrap" >
                                    <img src={dollar} alt="" className='w-[30px] md:w-[100%]' />
                                </div>
                                <div className="flex flex-col  text-[8px] md:text-sm">
                                    <span className="">{user.bounsQzeto}$</span>
                                    <span className="">Bonus Qzeto</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className=" flex items-center" onClick={onToggleSidebar}>
                        {/* add question btn? */}
                        {
                            active === 2 || active === 3 ?
                                <Link to='/dashboard/QuizShedule'>  <button className="bg-[#FFB125] text-white rounded-full py-1 px-1 text-[10px] md:flex gap-1 items-center mr-1 hidden" onClick={() => { setOpen(true) }}><BiTime className='text-xl' />Shedule Quiz</button></Link>
                                : ""
                        }
                        {
                            active === 2 || active === 3 ?
                                <Link to='/dashboard/questions'>   <button className="bg-[#32CD32] text-white rounded-full py-1 px-1 text-[10px] md:flex gap-1 items-center mr-1 hidden" onClick={() => { setOpen(true) }}><IoAddCircleSharp className='text-xl' />Add Question</button></Link>
                                : ""
                        }

                        <div className="profileName px-1 hidden md:flex flex-col  font-bold text-[#003881]">
                            <span>{user.firstName}{user.lastName}</span>
                            <span className="ms-8 text-[10px]">{user.role}</span>
                        </div>
                        <div className="rounded-full relative">
                            <img src={`${backend_url}${user?.profilePic}`} alt="" className="w-[50px] h-[50px] rounded-full" onClick={handleButtonClick} />
                            <div className="w-[8px] h-[8px] rounded-full bg-green-600 absolute right-1 bottom-1 animate-bounce"></div>
                        </div>
                    </div>

                </div>

                {isProfileMenuOpen && (
                    <div className="absolute bg-opacity-50 right-3  bottom-[-55px]">
                        <div className="w-24 px-2 flex flex-col items-start bg-white shadow-md text-black rounded-md p-1">

                            <Link to='/dashboard/profile' className='border-b border-gray-300'>Edit Profile</Link>
                            <button className="hover:text-blue-300 hover:text-md" onClick={LogOut}>Logout</button>
                        </div>
                    </div>
                )}

                {
                    open ? setActive(2) : ""
                }
            </div>


        </>
    )
}

export default MenuBar
