import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {  server } from '../server';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import DashBoard from './DashBoard';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  time: Yup.string().required('Time is required'),
  price: Yup.string().required('Price is required'),
  image: Yup.mixed().required('Image is required'),
});

const AddQuizPkg = () => {
  const { user } = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars
  const [selectedImage, setSelectedImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      userId: user._id,
      title: '',
      category: '',
      time: '',
      price: '',
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      
        const formData = new FormData();
        formData.append('userId', values.userId);
        formData.append('title', values.title);
        formData.append('category', values.category);
        formData.append('time', values.time);
        formData.append('price', values.price);
        formData.append('image', formik.values.image);
       
        try {
          await axios.post(`${server}/QuizPkg/createPkg`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(formData);
          toast.success('Quiz Package created successfully');
        } catch (error) {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.error);
          } else {
            toast.error('Failed to save Quiz. Please try again later.');
          }
        }
      }
      
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    formik.setFieldValue('image', file);
  };
  

  return (
    <DashBoard>
      <div className="p-2">
        <div>
          <h3 className="text-[#00459E] font-medium text-xl">Schedule New Quiz</h3>
        </div>

        <div>
          <form className="py-5 md:py-8 px-5" onSubmit={formik.handleSubmit}>
            <div className="flex gap-2 items-center">
              <div className="bg-[#00459E] rounded-full px-3 py-1 text-white">1</div>
              <p className="text-black text-lg">Add Quiz Packages</p>
            </div>
            <div className="py-4 md:px-5 flex w-full flex-wrap gap-4">
              <div className="w-full md:w-[45%]">
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

              <div className="w-full md:w-[45%]">
                <label htmlFor="category" className="block font-normal mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  className="w-full border px-2 border-black rounded py-2"
                  placeholder="Enter the quiz category here"
                />
                {formik.errors.category && (
                  <p className="text-red-500">{formik.errors.category}</p>
                )}
              </div>

              <div className="w-full md:w-[45%]">
                <label htmlFor="time" className="block font-normal mb-1">
                  Time
                </label>
                <input
                  type="date"
                  name="time"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  className="w-full border px-2 border-black rounded py-2"
                  placeholder="Enter the quiz time here"
                />
                {formik.errors.time && (
                  <p className="text-red-500">{formik.errors.time}</p>
                )}
              </div>

              <div className="w-full md:w-[45%]">
                <label htmlFor="price" className="block font-normal mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  className="w-full border px-2 border-black rounded py-2"
                  placeholder="Enter the quiz price here"
                />
                {formik.errors.price && (
                  <p className="text-red-500">{formik.errors.price}</p>
                )}
              </div>

              {/* <img  src={`${backend_url}${selectedImage}`} alt="" className="w-[200px] h-[200px] rounded-full" /> */}

              <div className="w-full md:w-[45%]">
                <label htmlFor="image" className="block font-normal mb-1">
                  Banner for Quiz
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="image"
                  className="bg-[#7393B3] text-white rounded-sm p-2"
                >
                  Select the Banner
                </label>
              </div>
            </div>
            <div className="md:mt-7 mt-4 flex justify-end items-end">
              <button
                type="submit"
                className="bg-[#00459e] text-white py-2 px-5 mx-5 text-sm rounded-full"
                disabled={!formik.isValid || !formik.values.image}
              >
                Create Package
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashBoard>
  );
};

export default AddQuizPkg;
