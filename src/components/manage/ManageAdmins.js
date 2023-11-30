import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import './ManageAdmins.css'

function ManageAdmins() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  const [admins, setAdmins] = useState([]);
  const [showAddAdmin,setShowAddAdmin]=useState(false)
  const [showSeeAdmins,setShowSeeAdmins]=useState(false)
  const [message,setMessage]=useState("")
  const handleShowAddAdmin=()=>{
    if(showSeeAdmins==true){
      setShowSeeAdmins(false)
    }
    setShowAddAdmin(!showAddAdmin)
  }
  const handleShowSeeAdmins=()=>{
    let token=localStorage.getItem("token")
      axios.get('http://localhost:4089/admins/get-admins',{headers:{"Authorization":"Bearer "+token}})
      .then((response) => {
        if (response.status === 201) { 
          let fetched_admins=response.data.payload
          fetched_admins.sort((a, b) => {
            const nameA = a.username.toUpperCase();
            const nameB = b.username.toUpperCase();
            
            if (nameA < nameB) {
              return -1; // Sort in descending order
            } else if (nameA > nameB) {
              return 1;
            } else {
              return 0;
            }
          });
          
          setAdmins(fetched_admins);
        } else {
          setMessage("Error fetching admins");
        }
      })
      .catch(err => {
        setMessage("Error: " + err.message);
      })
      if(showAddAdmin==true){
        setShowAddAdmin(false)
      }
      setShowSeeAdmins(!showSeeAdmins)
  }
  const handleRegisterAdmin=(adminDetails)=>{
    let token=localStorage.getItem("token")
    axios.post('http://localhost:4089/admins/register-admin',adminDetails,{headers:{"Authorization":"Bearer "+token}})
    .then(response=>{
      console.log(response.data.message)
      if(response.status===201){
        setMessage(response.data.message)
        console.log(response.data.message)
      }
      else{
        setMessage(response.data.message)
      }
      setTimeout(()=>{
            setMessage("")
      },10000)
    })
    .catch(err=>{
      setMessage(err)
      setTimeout(()=>{
        setMessage("")
      },10000)
    })
  }
  
  return (
    <div>
    <div className=' justify-content-between mx-auto w-50 d-flex justify-content-around mt-3'>
    <button className='admin_btn btn btn-dark mt-3 w-25 fw-bold' onClick={handleShowAddAdmin}>Add Admin</button>
    <button className='admin_btn btn btn-dark mt-3 w-25 fw-bold' onClick={handleShowSeeAdmins}>See Admins</button>
    </div>
    {showAddAdmin && <form onSubmit={handleSubmit(handleRegisterAdmin)}>
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
        <button type="submit" className='btn d-flex btn-primary mx-auto'>Add</button>
        
      </form>}
      {message.length !== 0 && (
        <p className='d-flex mx-auto'>{message}</p>
      )}

        {showSeeAdmins && <div className='admins mx-auto'>
          <h2 className='text-center mb-5'>Admins</h2>
          {admins.map((admin,index)=>[
            <div className='admin-details mb-3 mx-auto p-3'>
                <h5 className='ms-3'>{admin.username}</h5>
            </div>
          ])}
          </div>}
    </div>
  )
}

export default ManageAdmins;