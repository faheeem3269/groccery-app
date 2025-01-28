import React from 'react'
import axios from 'axios'
import * as yup from 'yup';
import  { useFormik } from 'formik';
import { useState } from 'react';

function Signup() {
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const yupSchema = yup.object({
    username: yup.string().min(2, "Too short").max(50, "Too long").required('Username is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8, "Password must be at least 8 characters").required('Password is required'),
    confirmpassword: yup.string()
        .oneOf([yup.ref("password"), null], 'Passwords must match')
        .required('Confirm password is required'),
});


  const formik=useFormik({
    initialValues:{
      username:'',
      email:'',
      password:'',
      confirmpassword:''
    },
    validationSchema:yupSchema,
    onSubmit: async (values) => {
      try {
        // Making the POST request to the server
        const response = await axios.post("http://127.0.0.1:3001/signup", values);
        
        // Handle successful signup (e.g., redirect to login page or show success message)
        if(response.status()===201){
          setSuccessMessage(response);
        }
       
      
        setTimeout(() => {
          setSuccessMessage('');
        }, 7200); // 2 minutes
      } catch (error) {
        // Catching any errors from the server
        if (error) {
          // If the server responded with an error, set the error message
          setServerError(error.response.data.message || 'An error occurred while signing up');
          setTimeout(() => {
            setServerError('');
          }, 7200); // 2 minutes
        } else {
          // If there is a network error or no response
          setServerError('Network error. Please try again later.');
        }
      }
    },



  })
  return (
    <div className='min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col justify-center'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md flex justify-center'>
          <h1 className='text-2xl font-bold'>signup</h1>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        {serverError && (
            <div className="bg-red-400 text-white p-2 mb-2 rounded-md">
              {serverError} {/* Displaying the server error message */}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-400 text-white p-2 mb-2 rounded-md">
              {setServerError} {/* Displaying the server error message */}
            </div>
          )}
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                <form className='space-y-5' onSubmit={formik.handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Username</label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                          <input className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' type='text' placeholder='enter username'
                           name='username'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          ></input>
                        </div>
                        {formik.touched.username && formik.errors.username ? (
                            <div className='text-red-500'>{formik.errors.username}</div>
                        ) : null}
                       
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Email</label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                         <input className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' type='email' placeholder='enter Email'
                         name='email'
                        onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.email}></input>
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-red-500'>{formik.errors.email}</div>
                        ) : null}
                        
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>password</label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                          <input className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' type='password' placeholder='enter Password'
                           name='password'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          ></input>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className='text-red-500'>{formik.errors.password}</div>
                        ) : null}
                        
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                          <input className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' type='password' placeholder='Confirm Password'
                           name='confirmpassword'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmpassword}
                          ></input>
                        </div>
                        {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                            <div className='text-red-500'>{formik.errors.confirmpassword}</div>
                        ) : null}
                        
                    </div>
                    <div><button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Create account</button></div>

                </form>
                <p class="mt-5 text-center text-sm text-gray-600">Already have an account? <a class="font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:underline transition ease-in-out duration-150" href="/login" data-discover="true">Sign in</a></p>
            </div>
            
        </div>
      
    </div>
  )
}

export default Signup
