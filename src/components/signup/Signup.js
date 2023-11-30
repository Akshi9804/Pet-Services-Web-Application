import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Signup() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let [error,setError]=useState()
  const navigate=useNavigate()
  const formSubmit=(userObj)=>{
    axios.post('http://localhost:4089/users/register-user',userObj)
    .then(response=>{
        if(response.status===201){
          navigate('/login')
        }
        else{
          setError(response.data.message)
        }
    })
    .catch(err=>{
      if(err.response){
        setError(err.message)
      }
      if(err.request){
        setError(err.message)
      }else{
        setError(err.message)
      }
    })
  }
  return (
    <div className='w-50 mt-5 mx-auto'>
      <p className='display-3 fw-bold text-center'>Sign Up</p>
      <form className='bg-white rounded text-center p-4' onSubmit={handleSubmit(formSubmit)}>
        <div className='mx-auto mb-3'>
            <lable htmlFor="username" className="text-white me-4"></lable>
            <input type='text' name='username' id='username' className='form-control w-75 mx-auto' placeholder='Enter Username'
            {...register("usernname",{required:true,minLength:6})}></input>
            {/*Validation error message */}
            {errors.username?.type==="required"&&<p className='text-danger'>*username is required</p>}
            {errors.username?.type==="minLength"&&<p className='text-danger'>*mininmun number of characters should be 6</p>}
        </div>
        
        <div className='mx-auto mb-4'>
            <lable htmlFor="password" className="text-white me-4"></lable>
            <input type='password' name='password' id='password' className='form-control w-75 mx-auto' placeholder='Enter Password'
            {...register("password",{required:true,minLength:8})}></input>
            {errors.password?.type==="required"&&<p className='text-danger'>*password is required</p>}
            {errors.password?.type==="minLength"&&<p className='text-danger'>*mininmun number of characters should be 8</p>}
        </div>
        <div className='mx-auto mb-3'>
            <lable htmlFor="email" className="text-white me-4"></lable>
            <input type='text' name='email' id='email' className='form-control w-75 mx-auto' placeholder='Enter Email Id'
            {...register("email",{required:true})}></input>
            {errors.email?.type==="required"&&<p className='text-danger'>*email is required</p>}
    
        </div>
        <div className='mx-auto mb-3'>
            <lable htmlFor="phnno" className="text-white me-4"></lable>
            <input type='text' name='phnno' id='phnno' className='form-control w-75 mx-auto' placeholder='Enter Phone Number'
            {...register("phono",{required:true,minLength:10,maxLength:10})}></input>
            {errors.phnno?.type==="required"&&<p className='text-danger'>*mobile number is required</p>}
            {(errors.phnno?.type==="minLength" || errors.username?.type==="maxLength")&&<p className='text-danger'>*number of characters should be 10</p>}
        </div>
        <button type="submit" className='btn btn-success'>Sign up</button>
      </form>
    </div>
  )
}

export default Signup;