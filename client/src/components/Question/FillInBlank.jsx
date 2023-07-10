import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios'
import { server } from '../../server'
import { toast } from 'react-toastify'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  question: Yup.string().required('Question is required'),
  correctAnswer: Yup.string().required('Correct answer is required'),

});

const FillInBlank = ({ selectedOption, selectedComponent }) => {

  const formik = useFormik({
    initialValues: {
      question: '',
      correctAnswer: '',
      category: '',
      type: ''
    },
    validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      values.category = selectedOption;
      values.type = selectedComponent.name;
    //   console.log(values);
      try {
        await axios.post(`${server}/Question/createQuestion`, values);
        toast.success('Question Created successful')
      } catch (error) {
        toast.error(error);
      }
    },
  });
  const handleSaveAndClose = () => {
    window.location.reload();
  };

  const handleSaveAndReset = () => {
    formik.resetForm();
  };


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

       
        
        <div className="flex pt-8 md:pt-20 md:justify-end justify-between gap-3">
          <button
            type="button"
            className="bg-[#00459e] text-white py-2 px-3 text-sm rounded-full"
            onClick={()=>{ formik.handleSubmit() || handleSaveAndClose();}}
          >
            Save & Close
          </button>
          <button
            type="button" // Change to type="button" as it's not a form submission
            className="bg-[#00459e] text-white py-2 px-3 text-sm rounded-full"
            onClick={() => {
              formik.handleSubmit() || handleSaveAndReset();
            }}
          >
            Save & Add Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FillInBlank;
