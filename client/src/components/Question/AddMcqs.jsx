import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios'
import { server } from '../../server'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Question is required'),
  correctAnswer: Yup.string().required('Correct answer is required'),
  optionA: Yup.string().required('Option A is required'),
  optionB: Yup.string().required('Option B is required'),
  optionC: Yup.string().required('Option C is required'),
  optionD: Yup.string().required('Option D is required'),
});

const AddMcqs = ({ selectedOption, selectedComponent }) => {
 const { user } = useSelector((state) => state.user);
console.log(user._id);
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userId: user._id,
      question: '',
      correctAnswer: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      category: '',
      type: ''
    },
    validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      values.category = selectedOption;
      values.type = selectedComponent.name;
      // console.log(values);
      try {
        await axios.post(`${server}/Question/createQuestion`, values);

        toast.success('Question Created successful');
        formik.resetForm();
        Navigate('/dashboard');
      } catch (error) {
        toast.error(error);
      }
    },
  });

  return (
    <div>
        
      <form className="py-5 md:py-8 px-5" onSubmit={formik.handleSubmit}>
        <div>
          <h4 className="text-[#00459E] text-lg font-medium py-1">Question</h4>
          <div>
            <input
              type="text"
              name="question"
              value={formik.values.question}
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
              value={formik.values.correctAnswer}
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
              value={formik.values.optionA}
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
              value={formik.values.optionB}
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
              value={formik.values.optionC}
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
              value={formik.values.optionD}
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
          <button
            type="submit"
            className="bg-[#00459e] text-white py-2 px-3 text-sm rounded-full"
          >
            Save & Close
          </button>
          <button
            type="button" // Change to type="button" as it's not a form submission
            className="bg-[#00459e] text-white py-2 px-3 text-sm rounded-full"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Save & Add Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMcqs;
