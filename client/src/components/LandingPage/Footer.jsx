import React from 'react'
import logo from '../../Assets/QuizBoz.png'
import { BsHeadset } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="py-16 bg-[#FAFAFA] w-full md:px-20 flex flex-wrap px-10" id='footer'>
            <div className="md:w-[25%] w-full">

                <div className="flex flex-col gap-4">
                    <img src={logo} alt="" className='w-[100px] py-3' />


                    <div className="flex gap-2 items-center">
                        <BsHeadset className='text-5xl' />
                        <div className="">
                            <p className="text-xl text-gray-500">Got Questions</p>
                            <p className="text-2xl font-bold">1900 0012 333</p>
                        </div>
                    </div>

                    <p className="text-gray-500 text-xl">Calista Wise 7292 Dictum AV</p>
                    <p className="text-gray-500 text-xl">Antonia, italy</p>
                </div>

            </div>




            <div className="md:w-[25%] w-full flex flex-col gap-4 ">

                <div className="">
                    <h3 className="text-xl font-bold py-4">Support</h3>
                </div>

                <Link to='' className='text-gray-500'>Privacy &  Cookies</Link>
                <Link to='' className='text-gray-500'>Store Dictorecy</Link>
                <Link to='' className='text-gray-500'>About</Link>
                <Link to='' className='text-gray-500'>Contact us</Link>
            </div>


            <div className="md:w-[25%] w-full flex flex-col gap-4 ">

                <div className="">
                    <h3 className="text-xl font-bold py-4">Social</h3>
                </div>

                <Link to='' className='text-gray-500'>Facebook</Link>
                <Link to='' className='text-gray-500'>Instagram</Link>
                <Link to='' className='text-gray-500'>Pinterest</Link>
                <Link to='' className='text-gray-500'>Twitter </Link>
            </div>


            <div className="md:w-[25%] w-full flex flex-col gap-7 ">

                <div className="">
                    <h3 className="text-xl font-bold py-4">Newsletter</h3>
                </div>

                <Link to='' className='text-gray-500'>Get the latest news and update for us</Link>

                <div className="border-b-2 p-2 border-gray-500 flex justify-between">
                    <input type="text" placeholder='Enter your Email here' name="" id="" className='bg-transparrent' />
                    <p className="text-black text-lg font-semibold">Subscribe</p>
                </div>
            </div>

        </div>


    )
}

export default Footer
