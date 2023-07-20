import React from 'react'
import icon from '../../Assets/QuizBoz.png'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
   <>
   <div className="flex justify-between">
     <Link to='/' >
      <img src={icon} alt="" className='md:w-[100px] w-[70px]'/></Link>
     <div className="flex md:gap-5 gap-2 items-center text-black">
        <a href='#contact' className='text-sm md:text-lg'>Contact Us</a>
        <a href='#footer' className='text-sm md:text-lg bg-transparent'>Help Center</a>
        <div className="block md:px-4 px-2 py-2 rounded text-white text-sm bg-[#F89820]">
        <Link to='login' > <button to='' className=''>Log in</button></Link>
        </div>
     </div>
   </div>
   </>
  )
}

export default Navbar
