import React from 'react'
import icon from '../../Assets/QuizBoz.png'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
   <>
   <div className="flex justify-between">
     <img src={icon} alt="" className='md:w-[100px] w-[70px]'/>
     <div className="flex md:gap-5 gap-2 items-center text-black">
        <Link to='' className=''>Contact Us</Link>
        <Link to='' className=''>Help Center</Link>
        <div className="block px-4 py-2 rounded text-white text-sm bg-[#F89820]">
        <Link to='login' > <button to='' className=''>Log in</button></Link>
        </div>
     </div>
   </div>
   </>
  )
}

export default Navbar
