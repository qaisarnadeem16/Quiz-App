import React, { useState } from 'react'
import DashBoard from '../pages/DashBoard'
import img from '../Assets/Ellipse 3.png'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { backend_url, server } from '../server';
import { toast } from 'react-toastify';
import { loadUser } from '../Redux/Action/User';


const validationSchema = Yup.object().shape({
    currentPassword: Yup.string(),
    newPassword: Yup.string(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    // Add validation rules for other fields
});

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            userId: user._id,
            currentPassword: '',
            newPassword: '',
            firstName: user.firstName,
            lastName: user.lastName,
            userName: '',
            email: user.email,
            address: user.address,
            city: user.city,
            state: user.state,
        },
        validationSchema, // Assign the validation schema
        onSubmit: async (values) => {
            try {
                
                await axios.put(`${server}/user/updateUser`, values
                );
                toast.success('Successfully updated user data');
            } catch (error) {
                console.error(error);
                toast.error('Error updating user data');
            }
        },
    });


    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        const userId = user._id; // Assuming you have access to the user ID
      
        const formData = new FormData();
        formData.append('profilePic', file);
        formData.append('userId', userId);
      
        try {
          await axios.put(`${server}/user/update-profilePic`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });
      
          dispatch(loadUser());
          toast.success('Profile updated successfully!');
        } catch (error) {
          toast.error('Error updating profile picture');
        }
      };
      
    return (
        <DashBoard >
            <div className="bg-[#E0DDDD] flex justify-center">
                <div className="md:w-[70%] w-full shadow-lg rounded-lg bg-white md:p-5 p-2 flex flex-wrap md:py-10">
                    <div className="md:w-[30%] w-full flex flex-col gap-3 justify-center md:border-r-4 border-[#F5F5F5] md:px-5">
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <img  src={`${backend_url}${user?.profilePic}`} alt="" className="w-[200px] h-[200px] rounded-full" />
                            {/* <img  src={img} alt="" className="w-[150px] " /> */}
                            <input
                                type="file"
                                id="image"
                                name="profilePicture"
                                className="hidden"
                                onChange={handleProfilePicChange}
                            />
                            <label htmlFor="image" className="bg-[#7393B3] text-white rounded-sm p-1">
                                Update your profile
                            </label>

                        </div>



                        <div className="">
                            <h4 className="text-black text-md font-semibold py-1">Current Password</h4>
                            <div>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formik.values.currentPassword}
                                    onChange={formik.handleChange}
                                    className="w-full border-0 bg-[#F5F5F5] px-2 py-1 rounded"
                                    placeholder="***********"
                                />
                            </div>

                        </div>


                        <div className="">
                            <h4 className="text-black text-md font-semibold py-1">New Password</h4>
                            <div>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    className="w-full border-0 bg-[#F5F5F5] px-2 py-1 rounded"
                                    placeholder="***********"
                                />
                            </div>

                        </div>


                        <div className="">
                            <h4 className="text-black text-md font-semibold py-1">Confirm Password</h4>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    className="w-full border-0 bg-[#F5F5F5] px-2 py-1 rounded"
                                    placeholder="***********"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="md:w-[70%] w-full flex flex-col gap-3 justify-center md:px-5 ">

                        <h1 className="text-2xl font-bold ">My Profile</h1>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <h4 className="text-black text-md font-medium py-1">First Name </h4>
                                <div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        onChange={formik.handleChange}
                                        className="w-full border-0 bg-[#F5F5F5] px-2 py-1 rounded"
                                        placeholder=""
                                        value={user.firstName}
                                    />
                                </div>

                            </div>

                            <div className="w-1/2">
                                <h4 className="text-black text-md font-medium py-1">Last Name </h4>
                                <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        onChange={formik.handleChange}
                                        className="w-full border-0 bg-[#F5F5F5] px-2 py-1 rounded"
                                        placeholder=""
                                        value={user.lastName}
                                    />
                                </div>

                            </div>


                        </div>


                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <h4 className="text-black text-md font-medium py-1"> User Name </h4>
                                <div>
                                    <input
                                        type="text"
                                        name="userName"
                                        onChange={formik.handleChange}
                                        className="w-full border-0 bg-[#F5F5F5] px-2 py-1 rounded"
                                        placeholder="Enter User Name  "
                                    />
                                </div>

                            </div>

                            <div className="w-1/2">
                                <h4 className="text-black text-md font-medium py-1">Email </h4>
                                <div>
                                    <input
                                        type="text"
                                        name="email"
                                        onChange={formik.handleChange}
                                        className="w-full border-0 bg-[#F5F5F5] px-2 py-1 rounded"
                                        placeholder=""
                                        value={user.email}
                                    />
                                </div>

                            </div>


                        </div>


                        <div className="flex gap-4">
                            <div className="md:w-[32%] w-full">
                                <h4 className="text-black text-md font-medium py-1"> Address </h4>
                                <div>
                                    <input
                                        type="text"
                                        name="address"
                                        onChange={formik.handleChange}
                                        className="w-full border-0 bg-[#F5F5F5] px-2 py-1 rounded"
                                        placeholder=""
                                        value={user.address}
                                    />
                                </div>

                            </div>


                            <div className="md:w-[32%] w-full">
                                <h4 className="text-black text-md font-medium py-1"> City </h4>
                                <div>
                                    <input
                                        type="text"
                                        name="city"
                                        onChange={formik.handleChange}
                                        className="w-full border-0 bg-[#F5F5F5] px-2 py-1 rounded"
                                        placeholder=""
                                        value={user.city}
                                    />
                                </div>

                            </div>



                            <div className="md:w-[32%] w-full">
                                <h4 className="text-black text-md font-medium py-1"> State </h4>
                                <div>
                                    <input
                                        type="text"
                                        name="state"
                                        onChange={formik.handleChange}
                                        className="w-full border-0 bg-[#F5F5F5] px-2 py-1 rounded"
                                        placeholder=""
                                        value={user.state}
                                    />
                                </div>

                            </div>



                        </div>
                    </div>

                    <div className="flex justify-end w-full">
                        <button
                            type="button"
                            className="bg-[#1876EF] text-white py-2 px-4 text-sm rounded-md"
                            onClick={() => {
                                formik.handleSubmit();
                            }}
                        >
                            Update Profile
                        </button>
                    </div>

                </div>
            </div>
        </DashBoard>
    )
}

export default Profile

