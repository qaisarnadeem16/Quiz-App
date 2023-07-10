import React from 'react'
import DashBoard from './DashBoard'
import img from '../Assets/pexels-monstera-5849577.jpg'

const UserWallet = () => {
  return (
    <DashBoard>
    <div className="flex justify-center items-cente bg-[#E0DDDD]">
        <img src={img} className='w-[90%] rounded-2xl' alt="" />
    </div>
    </DashBoard>
  )
}

export default UserWallet
