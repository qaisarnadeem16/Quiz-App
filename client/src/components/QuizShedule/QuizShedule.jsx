import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import DashBoard from '../../pages/DashBoard';


const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    type: Yup.string().required('Type is required'),
    category: Yup.string().required('Category is required'),
    date: Yup.string().required('Date is required'),
    startTime: Yup.string().required('Start Time is required'),
    endTime: Yup.string().required('End Time is required'),
    duration: Yup.string().required('Duration is required'),
    participants: Yup.string().required('Participants is required'),
    questionNo: Yup.string().required('No. of questions is required'),
});

const QuizSchedule = () => {
    const { user } = useSelector((state) => state.user);


    const formik = useFormik({
        initialValues: {
            userId:user._id,
            title: '',
            type: '',
            category: '',
            registrationFee: '',
            date: '',
            startTime: '',
            endTime: '',
            duration: '',
            participants: '',
            questionNo: '',
            user: '',
        },
        validationSchema, // Assign the validation schema
        onSubmit: async (values) => {
            values.user=user
            // console.log(values);
              try {
                await axios.post(`${server}/Quiz/scheduleQuiz`, values);
                toast.success('Quiz created successfully');
              }catch (error) {
                if (error.response && error.response.status === 400) {
                  toast.error(error.response.data.error);
                } else {
                  toast.error('Failed to save Quiz. Please try again later.');
                }
              }
        },
    });

    return (
        <DashBoard>
            <div className="p-2">
                <div className="">
                    <h3 className="text-[#00459E] font-medium text-xl">Schedule New Quiz</h3>
                </div>

                <div className="">
                    <form className="py-5 md:py-8 px-5" onSubmit={formik.handleSubmit}>
                        <div className="flex gap-2 items-center">
                            <div className="bg-[#00459E] rounded-full px-3 py-1 text-white">1</div>
                            <p className="text-black text-lg">Basic details</p>
                        </div>
                        <div className="py-4 md:px-5">
                            <div className="">
                                <label htmlFor="title" className="block font-normal mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    className="w-full border px-2 border-black rounded py-2"
                                    placeholder="Enter the quiz title here"
                                />
                                {formik.errors.title && (
                                    <p className="text-red-500">{formik.errors.title}</p>
                                )}
                            </div>

                            <div className="flex flex-wrap mt-3 md:gap-5 gap-2">
                                <div className="md:w-[30%] w-[48%]">
                                    <label htmlFor="type" className="block font-normal mb-1">
                                        Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                        className="w-full border px-2 border-black rounded py-2"
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="MCQs">MCQs</option>
                                        <option value="Fill in Blank">Fill in Blank</option>
                                        <option value="Drag and Drop">Drag and Drop</option>
                                    </select>
                                    {formik.errors.type && (
                                        <p className="text-red-500">{formik.errors.type}</p>
                                    )}
                                </div>

                                <div className="md:w-[30%] w-[48%]">
                                    <label htmlFor="category" className="block font-normal mb-1">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        className="w-full border px-2 border-black rounded py-2"
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="History">History</option>
                                        <option value="Science">Science</option>
                                        <option value="General knowledge">General knowledge</option>
                                    </select>
                                    {formik.errors.category && (
                                        <p className="text-red-500">{formik.errors.category}</p>
                                    )}
                                </div>

                                <div className="md:w-[30%] w-full">
                                    <label htmlFor="registrationFee" className="block font-normal mb-1">
                                        Registration fees
                                    </label>
                                    <input
                                        type="text"
                                        name="registrationFee"
                                        value={formik.values.registrationFee}
                                        onChange={formik.handleChange}
                                        className="w-full border px-2 border-black rounded py-[6px]"
                                        placeholder="Enter the registration fee"
                                    />
                                    {formik.errors.registrationFee && (
                                        <p className="text-red-500">{formik.errors.registrationFee}</p>
                                    )}
                                </div>
                            </div>

                        </div>
                        {/* time and Audince  */}

                        <div className="flex gap-2 items-center py-1">
                            <div className="bg-[#00459E] rounded-full px-3 py-1 text-white">2</div>
                            <p className="text-black text-lg">Timing and Audience</p>
                        </div>

                        <div className="flex flex-wrap mt-3 md:gap-5 gap-2 md:px-5">


                            <div className="md:w-[25%] w-full">
                                <label htmlFor="date" className="block font-normal mb-1">  Date  </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formik.values.registrationDate}
                                    onChange={formik.handleChange}
                                    className="w-full border px-2 border-black rounded py-[6px]"
                                />
                                {formik.errors.date && (
                                    <p className="text-red-500">{formik.errors.date}</p>
                                )}
                            </div>

                            <div className="md:w-[25%] w-[48%]">
                                <label htmlFor="startTime" className="block font-normal mb-1">  Start Time  </label>
                                <input
                                    type="date"
                                    name="startTime"
                                    value={formik.values.startTime}
                                    onChange={formik.handleChange}
                                    className="w-full border px-2 border-black rounded py-[6px]"
                                    placeholder='Select Time'
                                />
                                {formik.errors.startTime && (
                                    <p className="text-red-500">{formik.errors.startTime}</p>
                                )}
                            </div>

                            <div className="md:w-[25%] w-[48%]">
                                <label htmlFor="endTime" className="block font-normal mb-1">  End Time  </label>
                                <input
                                    type="date"
                                    name="endTime"
                                    value={formik.values.endTime}
                                    onChange={formik.handleChange}
                                    className="w-full border px-2 border-black rounded py-[6px]"
                                    placeholder='Select Time'
                                />
                                {formik.errors.endTime && (
                                    <p className="text-red-500">{formik.errors.endTime}</p>
                                )}
                            </div>

                            <div className="md:w-[25%] w-full">
                                <label htmlFor="participants" className="block font-normal mb-1">  Min.Participants  </label>
                                <input
                                    type="number"
                                    name="participants"
                                    value={formik.values.participants}
                                    onChange={formik.handleChange}
                                    className="w-full border px-2 border-black rounded py-[6px]"
                                    placeholder='Select Time'
                                />
                                {formik.errors.participants && (
                                    <p className="text-red-500">{formik.errors.participants}</p>
                                )}
                            </div>

                            <div className="md:w-[25%] w-full">
                                <label htmlFor="duration" className="block font-normal mb-1">  Duration  </label>
                                <input
                                    type="time"
                                    name="duration"
                                    value={formik.values.duration}
                                    onChange={formik.handleChange}
                                    className="w-full border px-2 border-black rounded py-[6px]"
                                    placeholder=''
                                />
                                {formik.errors.duration && (
                                    <p className="text-red-500">{formik.errors.duration}</p>
                                )}
                            </div>
                        </div>


                        {/* Question Rules  */}
                        <div className="flex gap-2 items-center py-1 pt-5">
                            <div className="bg-[#00459E] rounded-full px-3 py-1 text-white">3</div>
                            <p className="text-black text-lg">Question Rules</p>
                        </div>


                        <div className="flex flex-wrap mt-3 md:gap-5 gap-2 md:px-5">

                            <div className="md:w-[28%] w-full">
                                <label htmlFor="questionType" className="block font-normal mb-1">
                                    Question Type
                                </label>
                                <select
                                    name="questionType"
                                    value={formik.values.questionType}
                                    onChange={formik.handleChange}
                                    className="w-full border px-2 border-black rounded py-2"
                                >
                                    <option value="" disabled>Select an option</option>
                                    <option value="History">History</option>
                                    <option value="Science">Science</option>
                                    <option value="General knowledge">General knowledge</option>
                                </select>
                                {formik.errors.questionType && (
                                    <p className="text-red-500">{formik.errors.questionType}</p>
                                )}
                            </div>

                            <div className="md:w-[28%] w-full">
                                <label htmlFor="questionSubject" className="block font-normal mb-1">
                                    Question Subject
                                </label>
                                <select
                                    name="questionSubject"
                                    value={formik.values.questionSubject}
                                    onChange={formik.handleChange}
                                    className="w-full border px-2 border-black rounded py-2"
                                >
                                    <option value="" disabled>Select an option</option>
                                    <option value="History">History</option>
                                    <option value="Science">Science</option>
                                    <option value="General knowledge">General knowledge</option>
                                </select>
                                {formik.errors.questionSubject && (
                                    <p className="text-red-500">{formik.errors.questionSubject}</p>
                                )}
                            </div>

                            <div className="md:w-[28%] w-full">
                                <label htmlFor="questionNo" className="block font-normal mb-1">
                                    No. of questions
                                </label>
                                <input
                                    type="number"
                                    name="questionNo"
                                    value={formik.values.questionNo}
                                    onChange={formik.handleChange}
                                    className="md:w-[20%] w-full border px-2 border-black rounded py-[6px]"
                                    placeholder="1"
                                />
                                {formik.errors.questionNo && (
                                    <p className="text-red-500">{formik.errors.questionNo}</p>
                                )}
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="text-[#00459e] py-3 md;px-5 text-sm rounded-full" >
                            Add  more +
                        </button>

                    </form>
                    <div className="md:mt-7 mt-4 flex justify-end items-end">
                        <button
                            type="button" // Change to type="button" as it's not a form submission
                            className="bg-[#00459e] text-white py-2 px-5 mx-5 text-sm rounded-full "
                            onClick={() => {
                                formik.handleSubmit();
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </DashBoard>
    );
};

export default QuizSchedule;
