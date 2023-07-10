import React, { useState } from 'react'
import {IoAddCircleSharp} from 'react-icons/io5'
import QuestionBank from './AddQuestions'
import QuestionTable from './QuestionTable'
import DashBoard from '../../pages/DashBoard'

const Questions = () => {
    const [open , setOpen]=useState(false)


  return (
    <DashBoard>
    <div className="p-2">
        <div className="flex justify-between">
        <h3 className="text-[#00459E] font-semibold text-xl"> Questions Bank</h3>
        <button className="bg-[#32CD32] text-white rounded-full py-2 px-2 text-[10px] flex gap-1 items-center" onClick={()=>{setOpen(true)}}><IoAddCircleSharp className='text-xl'/>Add Question</button>
        </div>
    </div>

    {
        open ? <QuestionBank />: <QuestionTable/>
    }
    </DashBoard>
  )
}

export default Questions
