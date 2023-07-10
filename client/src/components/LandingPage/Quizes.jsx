import React from "react";
import Slider from "react-slick";
import img1 from '../../Assets/Capture.PNG'
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'

const Quizes = () => {

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
    return (
        <>
            <div className="p-5 md:px-10 md:py-10 font-[Raleway]">
                <div className="heading flex flex-col gap-1 justify-center items-center py-10">

                    <h1 className="text-black font-bold text-3xl ">Our Quizes</h1>
                    <div className="w-[150px] h-[3px] bg-black"></div>
                </div>

                <div className="">
                    <Slider {...settings}>
                        <div className="md:px-4">
                            <div className="flex flex-col  border border-gray-200">
                                <img src={img1} alt="" />
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="bg-purple-500 py-2 px-3 w-1/2 text-center text-white text-lg">Engineering</div>
                                    <h3 className="text-xl font-medium">Engineering Mechacnics</h3>
                                    <div className="flex gap-1 items-center">
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiOutlineStar className="text-[#FFCC21] text-lg" />
                                        <p className="text-black ml-3">4.5</p>
                                        <p className="text-gray-400 ml-1">(2 Reviews)</p>
                                    </div>
                                </div>
                                <div className="border border-gray-200 p-2 flex justify-between px-5">
                                    <h3 className="text-2xl font-semibold">$20</h3>
                                    <h3 className="text-2xl font-semibold">Add to Cart</h3>
                                </div>
                            </div>
                        </div>

                        <div className="md:px-4">
                            <div className="flex flex-col  border border-gray-200">
                                <img src={img1} alt="" />
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="bg-purple-500 py-2 px-3 w-1/2 text-center text-white text-lg">Engineering</div>
                                    <h3 className="text-xl font-medium">Engineering Mechacnics</h3>
                                    <div className="flex gap-1 items-center">
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiOutlineStar className="text-[#FFCC21] text-lg" />
                                        <p className="text-black ml-3">4.5</p>
                                        <p className="text-gray-400 ml-1">(2 Reviews)</p>
                                    </div>
                                </div>
                                <div className="border border-gray-200 p-2 flex justify-between px-5">
                                    <h3 className="text-2xl font-semibold">$20</h3>
                                    <h3 className="text-2xl font-semibold">Add to Cart</h3>
                                </div>
                            </div>
                        </div>




                        <div className="md:px-4">
                            <div className="flex flex-col  border border-gray-200">
                                <img src={img1} alt="" />
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="bg-purple-500 py-2 px-3 w-1/2 text-center text-white text-lg">Engineering</div>
                                    <h3 className="text-xl font-medium">Engineering Mechacnics</h3>
                                    <div className="flex gap-1 items-center">
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiOutlineStar className="text-[#FFCC21] text-lg" />
                                        <p className="text-black ml-3">4.5</p>
                                        <p className="text-gray-400 ml-1">(2 Reviews)</p>
                                    </div>
                                </div>
                                <div className="border border-gray-200 p-2 flex justify-between px-5">
                                    <h3 className="text-2xl font-semibold">$20</h3>
                                    <h3 className="text-2xl font-semibold">Add to Cart</h3>
                                </div>
                            </div>
                        </div>




                        <div className="md:px-4">
                            <div className="flex flex-col  border border-gray-200">
                                <img src={img1} alt="" />
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="bg-purple-500 py-2 px-3 w-1/2 text-center text-white text-lg">Engineering</div>
                                    <h3 className="text-xl font-medium">Engineering Mechacnics</h3>
                                    <div className="flex gap-1 items-center">
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiOutlineStar className="text-[#FFCC21] text-lg" />
                                        <p className="text-black ml-3">4.5</p>
                                        <p className="text-gray-400 ml-1">(2 Reviews)</p>
                                    </div>
                                </div>
                                <div className="border border-gray-200 p-2 flex justify-between px-5">
                                    <h3 className="text-2xl font-semibold">$20</h3>
                                    <h3 className="text-2xl font-semibold">Add to Cart</h3>
                                </div>
                            </div>
                        </div>



                        <div className="md:px-4">
                            <div className="flex flex-col  border border-gray-200">
                                <img src={img1} alt="" />
                                <div className="p-5 flex flex-col gap-5">
                                    <div className="bg-purple-500 py-2 px-3 w-1/2 text-center text-white text-lg">Engineering</div>
                                    <h3 className="text-xl font-medium">Engineering Mechacnics</h3>
                                    <div className="flex gap-1 items-center">
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiTwotoneStar className="text-[#FFCC21] text-lg" />
                                        <AiOutlineStar className="text-[#FFCC21] text-lg" />
                                        <p className="text-black ml-3">4.5</p>
                                        <p className="text-gray-400 ml-1">(2 Reviews)</p>
                                    </div>
                                </div>
                                <div className="border border-gray-200 p-2 flex justify-between px-5">
                                    <h3 className="text-2xl font-semibold">$20</h3>
                                    <h3 className="text-2xl font-semibold">Add to Cart</h3>
                                </div>
                            </div>
                        </div>
                       
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default Quizes
