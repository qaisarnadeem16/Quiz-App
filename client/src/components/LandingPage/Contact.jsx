import React from 'react'
import img from '../../Assets/contact-form-bg-img 1.png'
import { AiFillCheckCircle } from 'react-icons/ai'

const Contact = () => {
    return (
        <div id='contact'>
            <div className="py-5">
                <div className="relative h-screen">
                    <img src={img} alt="" className='md:w-[1872px] h-screen md:block hidden' />
                    <div className="md:w-1/2 w-full h-full absolute left-0 top-0 bg-[#282C46] text-white flex flex-col gap-10 md:px-28 px-5 py-20">
                        <h2 className="text-2xl font-semibold ">Any Queries</h2>
                        <p className="text-lg  ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ipsum dolores aliquam nisi eius officiis fugiat sint numquam minus Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias earum accusantium labore ipsum rerum quis alias</p>

                        <div className="flex gap-8 justify-">
                            <input type="text" className="py-3 w-[45%] bg-white rounded-lg px-7" placeholder='First Name' />
                            <input type="text" className="py-3 w-[45%] bg-white rounded-lg px-7" placeholder='First last' />
                        </div>

                        <textarea name="" id="" cols="30" rows="10" placeholder='Address' className="py-3 w-[95%]  bg-white rounded-lg px-7"></textarea>

                        <button className="bg-[#00459E] py-3 px-5 text-xl font-bold rounded-md w-[200px] mx-auto">Submit Details</button>
                    </div>
                </div>
            </div>

            <div className="py-16 md:px-20 px-5 flex flex-col gap-10">
                <h1 className="text-6xl text-black">Additional Key Features</h1>

                <p className="text-3xl text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum dolorem accusamus doloremque quos in sit enim optio voluptatum at inventore. Fuga sequi rem voluptas deleniti aut quasi natus! Tenetur, iusto!</p>

                <div className="flex flex-col gap-5 text-gray-500 text-2xl">
                    <div className="flex gap-2 items-center"><AiFillCheckCircle />
                        Post quiz messages
                    </div>

                    <div className="flex gap-2 items-center"><AiFillCheckCircle />
                        Set questions individually
                    </div>

                    <div className="flex gap-2 items-center"><AiFillCheckCircle />
                        Set questions from categories
                    </div>

                    <div className="flex gap-2 items-center"><AiFillCheckCircle />
                        Set mark for each questions individually 
                    </div>

                    <div className="flex gap-2 items-center"><AiFillCheckCircle />
                        Set negative  mark for each questions individually 
                    </div>

                    <div className="flex gap-2 items-center"><AiFillCheckCircle />
                        Show correct mark for each questions and explainations while taking quiz 
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Contact
