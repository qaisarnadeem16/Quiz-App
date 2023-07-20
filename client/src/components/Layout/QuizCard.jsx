import React, { useEffect, useState } from 'react'
import { BsCurrencyDollar, BsQuestion } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import axios from 'axios';
import { server } from '../../server';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import wallet from '../../Assets/hand-gesture.png'

const QuizCard = (props) => {
    const { user } = useSelector((state) => state.user);
    const Navigate = useNavigate()

    const [timeLeft, setTimeLeft] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [popup, setPopup] = useState(false)
    //check registration
    useEffect(() => {
        checkRegistrationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkRegistrationStatus = async () => {
        try {
            const response = await axios.get(`${server}/Quiz/checkRegistration/${props._id}/${user._id}`);
            setIsRegistered(response.data.isRegistered);
        } catch (error) {
            console.error(error);
        }
    };

    //timers
    useEffect(() => {
        // Set the target date and time for the countdown
        const targetDate = new Date(props.startTimeDate);

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate.getTime() - now;

            if (difference <= 0) {
                // Countdown has ended
                setTimeLeft(null);

                return;
            }

            // Calculate days, hours, minutes, and seconds left
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        // Update the timer every second
        const timer = setInterval(calculateTimeLeft, 1000);

        // Clean up the timer when the component unmounts
        return () => clearInterval(timer);
    }, [props.startTimeDate]);

    // handle registration
    const handleRegister = async () => {
        try {
            await axios.post(`${server}/Quiz/registerUser`, {
                quizId: props._id,
                userId: user._id
            });
            setIsRegistered(true);
            toast.success('User registered successfully');
        } catch (error) {
            toast.error('Failed to register user');
        }
    };

   // handle handlePaidRegistration
   const handlePaidRegistration = async () => {
    try {
      // Check if user's free Qzeto balance is sufficient
      if (user.freeQzeto >= props.pkg) {
        await axios.post(`${server}/Quiz/registerUser`, {
          quizId: props._id,
          userId: user._id
        });
        setIsRegistered(true);
        toast.success('User registered successfully');
        setPopup(false); // Close the popup if it was open

      } else {
        // User's free Qzeto balance is insufficient
        toast.error('Insufficient balance');
        setPopup(false); // Close the popup if it was open
      }
    } catch (error) {
      toast.error('Failed to register user');
    }
  };
  

    const handlePlayQuiz = () => {
        const now = new Date().getTime();
        const startTime = new Date(props.startTimeDate).getTime();
        const endTime = new Date(props.endTimeDate).getTime();

        if (isRegistered && startTime <= now && endTime >= now) {
            Navigate(`/dashboard/quizplay/${props._id}`); // Navigate to the quiz page
        } else {
            if (!isRegistered) {
                toast.error('Please register to play the quiz.');
            } else if (startTime > now) {
                toast.error('Quiz has not started yet.');
            } else if (endTime < now) {
                toast.error('Quiz has already ended.');
            }
        }
    };



    return (
        <>
            <div className=" md:w-[28%] w-full">
                <div className="bg-[#00459E] p-2">
                    {/* //top heading */}
                    <div className="flex  justify-between items-start gap-2">
                        <h4 className="text-white text-lg h-[70px]">{props.QuizName}</h4>

                        <div className={`rounded-full ${props.pkg === '0' ? 'bg-[#46CC5B]' : 'bg-red-500'} bg-[#46CC5B] text-white text-md px-3 `}>{props.pkg === '0' ? 'Free' : 'Paid'}</div>

                    </div>

                    {/* //timer */}
                    <div className="pt-4 text-white">
                        <p className="text-white text-md py-1">Ends in</p>
                        {timeLeft ? (
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="bg-[#42BA96] w-[35px] h-[35px] flex justify-center items-center text-lg">{timeLeft.days}</div>
                                    <span className="text-[12px]">Days</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="bg-[#EEC907] w-[35px] h-[35px] flex justify-center items-center text-lg">{timeLeft.hours}</div>
                                    <span className="text-[12px]">Hours</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="bg-[#32CD32] w-[35px] h-[35px] flex justify-center items-center text-lg">{timeLeft.minutes}</div>
                                    <span className="text-[12px]">Min</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="bg-[#FFA400] w-[35px] h-[35px] flex justify-center items-center text-lg">{timeLeft.seconds}</div>
                                    <span className="text-[12px]">Sec</span>
                                </div>

                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="bg-[#42BA96] w-[35px] h-[35px] flex justify-center items-center text-lg">0</div>
                                    <span className="text-[12px]">Days</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="bg-[#EEC907] w-[35px] h-[35px] flex justify-center items-center text-lg">0</div>
                                    <span className="text-[12px]">Hours</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="bg-[#32CD32] w-[35px] h-[35px] flex justify-center items-center text-lg">0</div>
                                    <span className="text-[12px]">Min</span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="bg-[#FFA400] w-[35px] h-[35px] flex justify-center items-center text-lg">0</div>
                                    <span className="text-[12px]">Sec</span>
                                </div>

                                {/* <div className="text-white">Its time to Play</div> */}

                            </div>
                        )}
                    </div>

                </div>

                {/* third row */}
                <div className="bg-[#F0F0F0] p-1 text-white flex justify-between relative">
                    <div className="flex gap-1">
                        <div className="px-2 flex gap-1 items-center">
                            <div className="bg-[#BF2B60] rounded-full text-lg p-1"><BsQuestion /></div>
                            <p className="text-black">{props.totalQuestions}</p>
                        </div>

                        <div className="px-2 flex gap-1">
                            <div className="bg-[#00459E] rounded-full text-lg p-1"><AiOutlineUser /></div>
                            <p className="text-black">{props.joinUsers}</p>
                        </div>

                        <div className="px-2 flex gap-1">
                            <div className="bg-[#FFB125] rounded-full  p-1"><BsCurrencyDollar /></div>
                            <p className="text-black">${props.pkg}</p>
                        </div>
                    </div>

                    <div className="absolute p-4 text-lg bg-[#00459e] rounded-full border border-white top-[-1.5rem] right-5">
                        <AiOutlineUser />
                    </div>
                </div>


                {/* last box */}
                <div className="bg-white text-black p-2">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="text-lg font-medium">Price Pool</p>
                            <div className="flex flex-col gap-2 pt-1">
                                <div className="px-2 flex gap-2 items-center ">
                                    <div className="bg-[#42BA96] rounded-full text-white text-center p-[4px] text-[10px]">1st</div>
                                    <p className="text-gray-700 text-sm">${props.firstPrize}</p>
                                </div>

                                <div className="px-2 flex gap-2 items-center text-sm">
                                    <div className="bg-[#00459e] rounded-full text-white text-center px-[4px] py-[2px] text-[9px]">2nd</div>
                                    <p className="text-gray-700">${props.secondPrize}</p>
                                </div>

                                <div className="px-2 flex gap-2 items-center">
                                    <div className="bg-[#E32828] rounded-full text-white text-center p-[4px] text-[10px]">3rd</div>
                                    <p className="text-gray-700 text-sm">${props.thirdPrize}</p>
                                </div>
                            </div>
                        </div>



                        <div className="">
                            <p className="text-lg font-medium">Quiz Shedule</p>
                            <div className="flex flex-col gap-2 pt-1 text-[#616161] text-[12px]">
                                <p className="">Start: {props.startTimeDate}</p>
                                <p className="">End: {props.endTimeDate}</p>

                            </div>
                        </div>

                    </div>

                    <div className="px-4 pt-7">
                        {isRegistered ?
                            <button onClick={() => handlePlayQuiz()} className="bg-[#FFA400] py-2 text-white font-medium text-xl text-center w-full rounded-lg">Play</button>
                            :
                            <button onClick={() => props.pkg === '0' ? handleRegister() : setPopup(true)} className="bg-[#3EC78D] py-2 text-white font-medium text-xl text-center w-full rounded-lg">Register</button>
                        }
                    </div>
                </div>



            </div>

            {popup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
                    <div className="p-5 bg-white rounded-lg">
                        <h2 className="text-xl font-semibold text-center">Do you want to register</h2>

                        <div className="mt-5 flex gap-7 justify-center w-full">
                            <div className="w-40 flex gap-3 items-center">
                                <div className="bg-[#00439A] w-[8px] rounded-xl h-[70px]"></div>
                                <div className="">
                                    <h4 className="text-sm">Required Free Qzeto</h4>
                                    <div className="flex gap-2 items-center">
                                        <div className="" >
                                            <img src={wallet} alt="" className='w-[30px] md:w-[100%]' />
                                        </div>
                                        <div className="flex flex-col text-[8px] md:text-sm mt-1">
                                            <span className="">{props.pkg}$</span>
                                            <span className="">Real Qzeto</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="w-40 flex gap-3 items-center">
                                <div className="bg-[#00439A] w-[8px] rounded-xl h-[70px]"></div>
                                <div className="">
                                    <h4 className="text-sm">Avialable Free Qzeto</h4>
                                    <div className="flex gap-2 items-center">
                                        <div className="" >
                                            <img src={wallet} alt="" className='w-[30px] md:w-[100%]' />
                                        </div>
                                        <div className="flex flex-col text-[8px] md:text-sm mt-1">
                                            <span className="">{user.freeQzeto}$</span>
                                            <span className="">Real Qzeto</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6 gap-3">
                            <div className="rounded-full bg-gray-300 px-5 text-lg py-1 cursor-pointer" onClick={()=>setPopup(false)}>No</div>
                            <div className="rounded-full bg-[#1DB95B] text-white px-5 text-lg py-1 cursor-pointer" onClick={handlePaidRegistration}>Yes</div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default QuizCard

// eslint-disable-next-line no-lone-blocks


