import React, { useState } from 'react'
import logo from '../Assets/logo.png'
import { server } from '../server'
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const SignupPage = () => {
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: {  'Content-Type': 'application/json' } };
    
        const newForm = new FormData();
        newForm.append("firstName", firstName);
        newForm.append("middleName", middleName);
        newForm.append("lastName", lastName);
        newForm.append("username", username);
        newForm.append("email", email);
        newForm.append("password", password);
        newForm.append("confirmPassword", confirmPassword);
        newForm.append("address", address);
        newForm.append("city", city);
        newForm.append("state", state);
    
        axios
          .post(`${server}/user/create-user`, newForm, config)
          .then((res) => {
            toast.success(res.data.message);
            setFirstName("")
            setMiddleName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setUsername("")
            setAddress("")
            setCity("")
            setState("")   
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      };
  
    return (
        <>
            <div className=" signup" >
                <div className="">
                    <div className="logo flex justify-center py-6 ">
                        <img src={logo} alt="" className='w-3/4 md:w-[30%]' />
                    </div>

                    <div className="bg-white md:bg-transparent hover:bg-white hover:text-black rounded-[2rem] mx-4 px-5 lg:mx-64 md:mx-40">
                        <h2 className="text-black text-3xl font-bold flex justify-center pt-3">Sign Up</h2>

                        <div className=" pt-8">


                            <div className="flex md:flex-row flex-col flex-wrap md:gap-6 gap-1 justify-center">

                                <label class="block md:w-[30%] w-full">
                                    <span class="block text-md  text-black ">First Name</span>
                                    <input type="text" placeholder="First Name" class="mt-1 block w-full px-5 py-3 bg-transparent border text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setFirstName(e.target.value)} />
                                </label>


                                <label class="block md:w-[30%] w-full">
                                    <span class="block text-md  text-black ">Middle Name</span>
                                    <input type="text" placeholder="Middle Name" class="mt-1 block w-full px-5 py-3 bg-transparent border text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setMiddleName(e.target.value)} />
                                </label>


                                <label class="block md:w-[30%] w-full">
                                    <span class="block text-md  text-black ">Last Name</span>
                                    <input type="text" placeholder="Last Name" class="mt-1 block w-full px-5 py-3 bg-transparent border  text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setLastName(e.target.value)} />
                                </label>

                                
                                <label class="block md:w-[46%] w-full">
                                    <span class="block text-md  text-black ">User Name</span>
                                    <input type="text" placeholder="User Name" class="mt-1 block w-full px-5 py-3 bg-transparent border  text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setUsername(e.target.value)} />
                                </label>

                                
                                <label class="block md:w-[46%] w-full">
                                    <span class="block text-md  text-black ">Email Number</span>
                                    <input type="email" placeholder="Email Number" class="mt-1 block w-full px-5 py-3 bg-transparent border  text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setEmail(e.target.value)} />
                                </label>


                                <label class="block md:w-[46%] w-full">
                                    <span class="block text-md  text-black ">Password</span>
                                    <input type="password" placeholder="Password" class="mt-1 block w-full px-5 py-3 bg-transparent border  text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setPassword(e.target.value)} />
                                </label>

                                
                                <label class="block md:w-[46%] w-full">
                                    <span class="block text-md  text-black ">Confirm Password</span>
                                    <input type="password" placeholder="Confirm Password" class="mt-1 block w-full px-5 py-3 bg-transparent border  text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setConfirmPassword(e.target.value)} />
                                </label>
                               
                                <label class="block md:w-[30%] w-full">
                                    <span class="block text-md  text-black ">Address</span>
                                    <input type="text" placeholder="Address" class="mt-1 block w-full px-5 py-3 bg-transparent border  text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setAddress(e.target.value)} />
                                </label>

                                <label class="block md:w-[30%] w-full">
                                    <span class="block text-md  text-black ">City</span>
                                    <input type="text" placeholder="City" class="mt-1 block w-full px-5 py-3 bg-transparent border  text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setCity(e.target.value)} />
                                </label>

                                <label class="block md:w-[30%] w-full">
                                    <span class="block text-md  text-black ">State</span>
                                    <input type="text" placeholder="State" class="mt-1 block w-full px-5 py-3 bg-transparent border  text-black md:border-slate-200 border-black rounded-lg  " onChange={(e) => setState(e.target.value)} />
                                </label>

                                <div class="w-full flex gap-4 md:ml-7 mt-1 items-center">
                                    <input type="checkbox" placeholder="State" class="mt-1 !bg-transparent   h-4 w-4 text-indigo-600 transition duration-150 ease-in-out  " onChange={(e) => setIsChecked(!isChecked)} />
                                    <span class=" text-sm block text-black md:text-[#807E7E]">By creating an account you agree to  <a href="/" className='decoration-none text-blue-700'> terms of use</a> and 
                                    <a href="/" className='decoration-none text-blue-700'> our privacy policy.</a></span>

                                </div>

                                   <button className='w-[95%] font-bold mt-1 text-center px-5 py-3 bg-transparent border   text-black md:border-slate-200 border-black rounded-lg ' onClick={handleSubmit}>Create Account</button>
                                   <span class=" text-lg mb-5  block text-black md:text-[#807E7E]">Already have an account <Link to="/login" className='decoration-none text-blue-700'> Login</Link> </span>
                           
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default SignupPage
