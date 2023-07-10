// import React, { useState } from 'react'
import logo from '../Assets/logo.png'


const ResetPasswordPage = () => {
    // const [email, setEmail] = useState('')

    return (
        <>
            <div className=" signup h-screen" >
                <div className="">
                    <div className="logo flex justify-center py-6 ">
                        <img src={logo} alt="" className='w-3/4 md:w-[30%]' />
                    </div>

                    <div className="bg-white  rounded-[2rem] lg:w-[40%] md:w-[60%] w-[97%] mx-auto py-8">
                        <h2 className="text-black text-3xl font-bold flex justify-center pt-3">Reset Password</h2>

                        <div className="mx-8  pt-8">


                            <div className="flex md:flex-row flex-col flex-wrap md:gap-4 gap-1 justify-center">

                                <label class="block  w-full">
                                    <span class="block text-md  text-black font-bold ">Email</span>
                                    <input type="email" class="mt-1 block w-full px-5 py-3 bg-transparent border md:text-white text-black md:border-slate-200 border-black rounded-lg  "  />
                                </label>


                            
                              <button className='w-full  mt-1 text-center px-5 py-3 bg-[#00439A] border md:text-white text-black md:border-slate-200 border-black rounded-xl '>Send Email</button>

                                <span class=" text-lg mb-5  block text-black md:text-[#807E7E]">Don`t have an account <a href="/" className='decoration-none text-blue-700'> Sign up</a> </span>
                            </div>

                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default ResetPasswordPage
