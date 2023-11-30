import React,{useContext,useEffect} from 'react'
import './Login.css'
import {Link,useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import { loginContext } from '../../contexts/loginContext'


function Login() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  const navigate=useNavigate()

  // //form submit
  let handleUserLogin=(userCredObj)=>{
    loginUser(userCredObj)
  }
  useEffect(()=>{
    if(currentUser.user==='customer'){
      navigate('/')
    }
    else if(currentUser.user==='admin'){
      navigate('/adminProfile')
    }
  },[currentUser])

  return (
    <div className='login-form mx-auto'>
    <div className='w-50 mx-auto'>
      <p className='display-3 fw-bold text-center'>Login</p>
      {error.length!==0 && 
		  (<p className='text-danger text-center'>{error}</p>)}
      <form className='text-center p-4' onSubmit={handleSubmit(handleUserLogin)}>
        <div className='mx-auto mb-3'>
            <lable htmlFor="username" className="text-white me-4"></lable>
            <input type='text' name='username' id='username' className='form-control w-75 mx-auto' placeholder='Enter Username'
            {...register("username",{required:true,minLength:6})}></input>
            {/*Validation error message */}
            {errors.username?.type==="required"&&<p className='text-danger'>Username is required</p>}
            {errors.username?.type==="minLength"&&<p className='text-danger'>Mininmun number of charanters should be 6</p>}
        </div>
        
        <div className='mx-auto mb-4'>
            <lable htmlFor="password" className="text-white me-4"></lable>
            <input type='password' name='password' id='password' className='form-control w-75 mx-auto' placeholder='Enter Password'
            {...register("password",{required:true,minLength:8})}>
              
            </input>
            {/*Validation error message */}
            {errors.password?.type==="required"&&<p className='text-danger'>Username is required</p>}
            {errors.password?.type==="minLength"&&<p className='text-danger'>Mininmun number of characters should be 8</p>}
            </div>
        <button type="submit" className='btn btn-success'>Login</button>
        
      </form>
      <div className='create_acc mt-2 text-primary'>
          <Link className="" id="link" to="/signup">Create an account</Link>
        </div>
    </div>
    </div>
  )
}

export default Login;