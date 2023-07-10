import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios'
import { server } from '../../server'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';
import DashBoard from '../../pages/DashBoard';


const WatchQuestion = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const Navigate = useNavigate();

  
    useEffect(() => {
      fetchQuestion();
    }, []);
  
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${server}/Question/getQuestion/${id}`);
        setQuestion(response.data.question);
      } catch (error) {
        console.error(error);
      }
    };
  const formik = useFormik({
    initialValues: {
        question: question?.question ,
        correctAnswer: question?.correctAnswer ,
        optionA: question?.optionA ,
        optionB: question?.optionB ,
        optionC: question?.optionC ,
        optionD: question?.optionD ,
      },
      enableReinitialize: true,
    // validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.put(`${server}/Question/updateQuestion/${id}`, values);
        const updatedQuestion = response.data.question;
        toast.success('Question updated successfully');
        formik.resetForm();
        Navigate('/dashboard');
      } catch (error) {
        toast.error('Error updating question');
      }
    },
  });

  

 
//   console.log(question)

  return (
    <DashBoard>
        
      <form className="py-5 md:py-8 px-5" onSubmit={formik.handleSubmit}>
        <div>
          <h4 className="text-[#00459E] text-lg font-medium py-1">Question</h4>
          <div>
            <input
              type="text"
              name="question"
              value={question?.question}
              onChange={formik.handleChange}
              className="w-full border px-2 border-black rounded py-2"
              placeholder="Enter the question"
            />
            {formik.errors.question && (
              <p className="text-red-500">{formik.errors.question}</p>
            )}
          </div>
        </div>

        <div className="py-3">
          <h4 className="text-[#00459E] text-lg font-medium">Correct Answer</h4>
          <div>
            <input
              type="text"
              name="correctAnswer"
              value={question?.correctAnswer}
              onChange={formik.handleChange}
              className="w-full border px-2 border-black rounded py-2"
              placeholder="Enter the correct answer"
            />
            {formik.errors.correctAnswer && formik.touched.correctAnswer && (
              <p className="text-red-500">{formik.errors.correctAnswer}</p>
            )}
          </div>
        </div>

        <div className="mt-7 py-1 px-1 bg-[#00459e] text-white rounded">Options</div>

        <div className="pt-5 flex gap-10 justify-between flex-wrap">

          <div className="flex w-full md:w-[45%] rounded border border-gray-700">

            <div className="py-2 px-4 text-white bg-[#EEC907]">A</div>

            <input
              type="text"
              name="optionA"
              value={question?.optionA}
              onChange={formik.handleChange}
              className="px-2 w-full"
              placeholder="Enter Option A"
            />
            {formik.errors.optionA && formik.touched.optionA && (
              <span className="text-red-500 text-sm">{formik.errors.optionA}</span>
            )}
          </div>

          <div className="flex w-full md:w-[45%] rounded border border-gray-700">
            <div className="py-2 px-4 text-white bg-[#42BA96]">B</div>
            <input
              type="text"
              name="optionB"
              value={question?.optionB}
              onChange={formik.handleChange}
              className="px-2 w-full"
              placeholder="Enter Option B"
            />  {formik.errors.optionB && formik.touched.optionB && (
              <span className="text-red-500">{formik.errors.optionB}</span>
            )}
          </div>

          <div className="flex w-full md:w-[45%] rounded border border-gray-700">
            <div className="py-2 px-4 text-white bg-[#32CD32]">C</div>
            <input
              type="text"
              name="optionC"
              value={question?.optionC}
              onChange={formik.handleChange}
              className="px-2 w-full"
              placeholder="Enter Option C"
            />
            {formik.errors.optionC && formik.touched.optionC && (
              <span className="text-red-500">{formik.errors.optionC}</span>
            )}
          </div>

          <div className="flex w-full md:w-[45%] rounded border border-gray-700">
            <div className="py-2 px-4 text-white bg-[#F18507]">D</div>
            <input
              type="text"
              name="optionD"
              value={question?.optionD}
              onChange={formik.handleChange}
              className="px-2 w-full"
              placeholder="Enter Option D"
            />
            {formik.errors.optionD && formik.touched.optionD && (
              <span className="text-red-500">{formik.errors.optionD}</span>
            )}
          </div>
        
        </div>
        <div className="flex pt-8 md:pt-20 md:justify-end justify-between gap-3">
        
          {/* <button
            type="button" // Change to type="button" as it's not a form submission
            className="bg-[#00459e] text-white py-2 px-3 text-sm rounded-full"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Update
          </button> */}
        </div>
      </form>
    </DashBoard>
  );
};

export default WatchQuestion;
