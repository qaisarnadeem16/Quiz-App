import React from 'react'
import alarm from '../../Assets/Alarm.png'
import alarm2 from '../../Assets/Alarm2.png'
import vector from '../../Assets/Vector2.png'
import assignment from '../../Assets/Assignment.png'
import assignment2 from '../../Assets/Assignment (1).png'
import brain from '../../Assets/brain 1.png'
import { MdOutlineNavigateNext } from 'react-icons/md'

const Features = () => {
    return (
        <>
            <div className="p-5 md:px-10 md:py-10 font-[Raleway]">
                <div className="heading flex flex-col gap-1 justify-center items-center py-10">

                    <h1 className="text-black font-bold text-2xl ">Key Features</h1>
                    <div className="w-[130px] h-[3px] bg-black"></div>
                </div>


                <div className="flex flex-wrap gap-5 justify-center ">
                    <div className="md:w-[451px] w-full bg-[#00459E] rounded-lg flex flex-col p-5 gap-5 text-white relative">

                        <img src={alarm} alt="" className=" w-[70px]" />
                        <p className=" text-[26px] font-[700]">Image, Audio & Video Answers
                        </p>
                        <p className="text-[26px] w-[90%] font-[500] py-2">Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</p>

                        <p className=" text-lg font-medium flex items-center gap-2 py-2">Read More <MdOutlineNavigateNext className='!text-white text-2xl' /></p>
                        <img src={alarm2} alt="" className="w-[150px] absolute bottom-0 right-16" />
                    </div>

                    <div className="md:w-[451px] w-full bg-[#282C46] rounded-lg flex flex-col p-5 gap-5 text-white relative">

                        <img src={alarm} alt="" className=" w-[70px]" />
                        <p className=" text-[26px] font-[700]">Image, Audio & Video Answers
                        </p>
                        <p className="text-[26px] w-[90%] font-[500] py-2">Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</p>

                        <p className=" text-lg font-medium flex items-center gap-2 py-2">Read More <MdOutlineNavigateNext className='!text-white text-2xl' /></p>
                        <img src={alarm2} alt="" className="w-[150px] absolute bottom-0 right-16" />
                    </div>

                    <div className="md:w-[451px] w-full bg-[#00459E] rounded-lg flex flex-col p-5 gap-5 text-white relative">

                        <img src={alarm} alt="" className=" w-[70px]" />
                        <p className=" text-[26px] font-[700]">Image, Audio & Video Answers
                        </p>
                        <p className="text-[26px] w-[90%] font-[500] py-2">Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</p>

                        <p className=" text-lg font-medium flex items-center gap-2 py-2">Read More <MdOutlineNavigateNext className='!text-white text-2xl' /></p>
                        <img src={alarm2} alt="" className="w-[150px] absolute bottom-0 right-16" />
                    </div>


                    <div className="md:w-[451px] w-full bg-[#282C46] rounded-lg flex flex-col p-5 gap-5 text-white relative">

                        <img src={alarm} alt="" className=" w-[70px]" />
                        <p className=" text-[26px] font-[700]">Image, Audio & Video Answers
                        </p>
                        <p className="text-[26px] w-[90%] font-[500] py-2">Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</p>

                        <p className=" text-lg font-medium flex items-center gap-2 py-2">Read More <MdOutlineNavigateNext className='!text-white text-2xl' /></p>
                        <img src={alarm2} alt="" className="w-[150px] absolute bottom-0 right-16" />
                    </div>

                    <div className="md:w-[451px] w-full bg-[#00459E] rounded-lg flex flex-col p-5 gap-5 text-white relative">

                        <img src={alarm} alt="" className=" w-[70px]" />
                        <p className=" text-[26px] font-[700]">Image, Audio & Video Answers
                        </p>
                        <p className="text-[26px] w-[90%] font-[500] py-2">Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</p>

                        <p className=" text-lg font-medium flex items-center gap-2 py-2">Read More <MdOutlineNavigateNext className='!text-white text-2xl' /></p>
                        <img src={alarm2} alt="" className="w-[150px] absolute bottom-0 right-16" />
                    </div>

                    <div className="md:w-[451px] w-full bg-[#282C46] rounded-lg flex flex-col p-5 gap-5 text-white relative">

                        <img src={alarm} alt="" className=" w-[70px]" />
                        <p className=" text-[26px] font-[700]">Image, Audio & Video Answers
                        </p>
                        <p className="text-[26px] w-[90%] font-[500] py-2">Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</p>

                        <p className=" text-lg font-medium flex items-center gap-2 py-2">Read More <MdOutlineNavigateNext className='!text-white text-2xl' /></p>
                        <img src={alarm2} alt="" className="w-[150px] absolute bottom-0 right-16" />
                    </div>


                </div>



            </div>


            <div className="md:pt-16 pt-8 flex flex-wrap">
                <div className="md:w-[33%] w-full h-[200px]  bg-[#BBBBBB] text-white flex flex-col gap-3 justify-center items-center">
                    <h1 className="text-4xl font-bold">1</h1>
                    <h4 className="text-4xl">Create Quiz</h4>
                </div>

                <div className="md:w-[33%] w-full h-[200px]  bg-black tabBg text-white flex flex-col gap-3 justify-center items-center">
                    <h1 className="text-4xl font-bold">2</h1>
                    <h4 className="text-4xl">Play Quiz</h4>
                </div>

                <div className="md:w-[33%] w-full h-[200px]  bg-black tabBg text-white flex flex-col gap-3 justify-center items-center">
                    <h1 className="text-4xl font-bold">3</h1>
                    <h4 className="text-4xl">Earn Money</h4>
                </div>

                <div className="md:w-1/2 w-full">
                    <div className=" h-[300px] bg-[#00459E]">
                        <img src={vector} alt="" className='pt-16 pl-16' />
                        <div className="w-[60%] text-white mx-auto md:text-4xl text-2xl">
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                        </div>
                    </div>
                    <div className="flex">
                    <div className="w-1/2 h-[400px] flex flex-col justify-center items-center gap-3 text-white bg-[#282C46]">
                        <img src={assignment} alt="" />
                        <h3 className="text-2xl ">Start Test </h3>
                        <p className="w-[70%] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt uat labore et dolore magna aliqua</p>
                    </div>
                    <div className="w-1/2 h-[400px] flex flex-col justify-center items-center gap-3 text-black bg-white">
                        <img src={assignment2} alt="" />
                        <h3 className="text-2xl ">Start Test </h3>
                        <p className="w-[70%] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt uat labore et dolore magna aliqua</p>
                    </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full bg-[#000000]">
                    <img src={brain} alt="" />
                </div>
            </div>
        </>
    )
}

export default Features
