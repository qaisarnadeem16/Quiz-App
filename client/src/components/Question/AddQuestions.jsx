import React, { useState } from 'react'
// import { RiArrowDropDownLine } from 'react-icons/ri'
import AddMcqs from './AddMcqs';
import FillInBlank from './FillInBlank';

const questionType = [
    { id: 1, name: 'MCQs' },
    { id: 2, name: 'Fill In Blank' },
]
const AddQuestions = () => {
    const [selectedOption, setSelectedOption] = useState('');
    // const [isOpen, setIsOpen] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);


    const handleComponentChange = (event) => {
        const componentId = parseInt(event.target.value);
        const selected = questionType.find((component) => component.id === componentId);
        setSelectedComponent(selected);
    };


   
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);

    };


    return (
        <>
            <div className="p-5 flex justify-between flex-col md:flex-row gap-3" >
                <div className="">
                    <h3 className="text-[#00459E] font-semibold text-xl">Add Questions</h3>
                </div>

                <div className="flex gap-4 flex-col md:flex-row">

                    <div className='flex items-center gap-2'>
                        <label htmlFor="dropdown" className="block mb-2 text-xl text-black font-[400] ">
                            Subject
                        </label>
                        <select
                            id="dropdown"
                            className="py-2 px-4 w-full bg-gray-200 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={selectedOption}
                            onChange={handleOptionChange} >
                            <option value="">Select Category</option>
                            <option value="History">History </option>
                            <option value="Science">Science </option>
                            <option value="General knowledge">General knowledge </option>
                        </select>
                    </div>

                    <div className="relative flex gap-7 md:gap-2 items-center">
                        <label htmlFor="dropdown" className="block mb-2 text-xl text-black font-[400] ">
                            Type
                        </label>


                        <div>
                            <select
                                className="px-4 py-2 border  border-gray-300  bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={selectedComponent?.id || ''}
                                onChange={handleComponentChange}
                            >
                                <option value="">Select a Question Type</option>
                                {questionType.map((component) => (
                                    <option key={component.id} value={component.id}>
                                        {component.name}
                                    </option>
                                ))}
                            </select>


                        </div>
                    </div>
                </div>

            </div>

            {selectedComponent && selectedComponent.name === 'MCQs' && (
                <AddMcqs selectedOption={selectedOption}  selectedComponent={selectedComponent}/>
            )}
            {selectedComponent && selectedComponent.name === 'Fill In Blank' && (
                <FillInBlank selectedOption={selectedOption} selectedComponent={selectedComponent}/>
            )}
         

        </>
    )
}

export default AddQuestions
