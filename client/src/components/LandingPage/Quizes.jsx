import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// import img1 from '../../Assets/Capture.PNG'  
// import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { BsFillBookmarkStarFill } from 'react-icons/bs'
import { FaMedal } from 'react-icons/fa'
import axios from "axios";
import { backend_url, server } from "../../server";
import { toast } from "react-toastify";
import moment from 'moment';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Quizes = () => {
  const [quizPkgs, setQuizPkgs] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate()
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    const fetchQuizPkgs = async () => {
      try {
        const response = await axios.get(`${server}/QuizPkg/getQuizPkgs`);
        setQuizPkgs(response.data.quizPkgs);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchQuizPkgs();
  }, []);


  // Purchase a package
  const buyPkg = async (id) => {
    try {
      setIsLoading(true);

      // Check if the user is logged in
      if (!user) {
        throw new Error('User not logged in');
      }
      if(!user){
        Navigate('/login');
      }

      // Send a POST request to join the Quiz Package
      const response = await axios.post(`${server}/QuizPkg/joinQuizPkg`, {
        userId: user._id,
        pkgID: id,
      });

      // Handle success
      toast.success(response.data.message);
      // window.location.reload();
      setPopup(true);
    } catch (error) {
      // Handle error
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to join Quiz Package. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    customPaging: function (i) {
      return (
        <div
          className="rounded-full border-black border my-5"
          style={{
            width: "15px",
            height: "15px",
          }}
        ></div>
      );
    },
  };

  if (isLoading === true) {
    return <div className='text-4xl text-center text-blue-500 flex justify-center items-center'>Loading.....</div>; 
  }
  return (
    <>
      <div className="p-5 md:px-10 md:py-10 font-[Raleway]">
        <div className="heading flex flex-col gap-1 justify-center items-center py-10">
          <h1 className="text-black font-bold text-3xl ">Our Quizes</h1>
          <div className="w-[150px] h-[3px] bg-black"></div>
        </div>

        <div className="">
          <Slider {...settings}>
            {quizPkgs.map((quizPkg) => {
              const targetDate = moment(quizPkg.time);
              const now = moment();
              const duration = moment.duration(targetDate.diff(now));
              const months = duration.months();
              const days = duration.days();
              const hours = duration.hours();
              const minutes = duration.minutes();

              return (
                <div className="md:px-4" key={quizPkg._id}>
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
                      {quizPkg.joinedUsers.includes(user?._id) ? (
                        <h3 className="text-xl  bg-purple-600 cursor-pointer px-2 py-1 rounded-md text-white" onClick={() =>setPopup(true)}>Subscribed</h3>
                      ) : (
                        <h3 className="text-2xl font-semibold cursor-pointer hover:bg-gray-300 px-2 py-1 rounded-md" onClick={() =>buyPkg(quizPkg._id)}>Add to Cart</h3>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      {popup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
          <div className="p-5 bg-white rounded-lg">
            <h2 className="text-xl font-semibold text-center"> Check All Package You Joined</h2>

         

            <div className="flex justify-center mt-6 gap-3">
              <div className="rounded-full bg-gray-300 px-5 text-lg py-1 cursor-pointer" onClick={() => setPopup(false)}>No</div>
              <Link to='/dashboard/userJoinPkg' className="rounded-full bg-[#1DB95B] text-white px-5 text-lg py-1 cursor-pointer">Yes</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quizes;
