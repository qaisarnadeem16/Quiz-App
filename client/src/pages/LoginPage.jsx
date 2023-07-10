import React, { useState } from 'react'
import logo from '../Assets/logo.png'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { server } from '../server'
import { toast } from 'react-toastify'


const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const Navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          await axios.post(
            `${server}/user/login-user`,
            {
              email,
              password,
            },
            { withCredentials: true }
          )
    
          toast.success('Login successful')
          Navigate('/dashboard')
          window.location.reload(true)
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Unauthorized - Token expired or invalid
            toast.error('Token expired. Please log in again.')
            Navigate('/login') // Redirect to the login page
          } else {
            toast.error('Login failed. Please try again.')
          }
        }
      }



    return (
        <>
            <div className=" signup h-screen" >
                <div className="">
                    <div className="logo flex justify-center py-6 ">
                        <img src={logo} alt="" className='w-3/4 md:w-[30%]' />
                    </div>

                    <div className="bg-white  rounded-[2rem] lg:w-[40%] md:w-[60%] w-[97%] mx-auto py-8">
                        <h2 className="text-black text-3xl font-bold flex justify-center pt-3">Log in</h2>

                        <div className="mx-8  pt-8">


                            <div className="flex md:flex-row flex-col flex-wrap md:gap-4 gap-1 justify-center">

                                <label className="block  w-full">
                                    <span className="block text-md  text-black font-bold ">Username or email</span>
                                    <input type="text" className="mt-1 block w-full px-5 py-3 bg-transparent border text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setEmail(e.target.value)} />
                                </label>


                                <label class="block w-full">
                                    <span class="block text-md font-bold text-black ">Password</span>
                                    <input type="password" class="mt-1 block w-full px-5 py-3 bg-transparent border text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setPassword(e.target.value)} />
                                </label>

                                <div className="w-full   items-center">
                                    <span className=" text-md block font-medium text-[#807E7E]">Forget Password <a href="/resetpassword" className='decoration-none text-blue-700'> Reset your Password</a> </span>
                                </div>
                              <button className='w-full  mt-1 text-center px-5 py-3 bg-[#00439A] border md:text-white text-black md:border-slate-200 border-black rounded-xl ' onClick={handleSubmit}>Log in</button>

                                <span className=" text-lg mb-5  block text-black md:text-[#807E7E]">Don`t have an account <Link to="/signup" className='decoration-none text-blue-700'> Sign up</Link> </span>
                            </div>

                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default LoginPage
