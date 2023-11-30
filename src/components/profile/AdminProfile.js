import React from 'react'
import { useNavigate } from 'react-router-dom';



function AdminPage() {
  let navigate=useNavigate();
  const goToManageAdmins=()=>{
    navigate('/manageAdmins')
  }
  const goToManageProducts=()=>{
    navigate('/manageProducts')
  }
  const goToManageUsers=()=>{
    navigate('/manageUsers')
  }

  return (

    <div>
    <div className=' justify-content-between mx-auto w-50 d-flex justify-content-around mt-3'>
    <button className='admin_btn btn btn-dark mt-3 w-25 fw-bold' onClick={goToManageAdmins}>Manage admins</button>
    <button className='admin_btn btn btn-dark mt-3 w-25 fw-bold' onClick={goToManageProducts}>Manage products</button>
    <button className='admin_btn btn btn-dark mt-3 w-25 fw-bold' onClick={goToManageUsers}>Manage users</button>
    </div>
  
    </div>
    
  )
}

export default AdminPage;