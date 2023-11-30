import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
const FormData=require('form-data')

function ManageProducts() {
	let [file,setFile]=useState(null)
  let {register,handleSubmit,formState:{errors}}=useForm()
  const [showAddProduct,setShowAddProduct]=useState(false)
  const [showDelProduct,setShowDelProduct]=useState(false)
  const [message,setMessage]=useState("")
  const handleShowAddProduct=()=>{
    if(showDelProduct===true){
      setShowDelProduct(!showDelProduct)
    }
    setShowAddProduct(!showAddProduct)
  }
  const handleShowDelProduct=()=>{
    if(showAddProduct===true){
      setShowAddProduct(!showAddProduct)
    }
    setShowDelProduct(!showDelProduct)
  }
  const handleAddProduct=(productDetails)=>{
    let token=localStorage.getItem("token")
    console.log(productDetails)
    const fd=new FormData();
		//append newUser to form data
		fd.append("product",JSON.stringify(productDetails));//converts to string
		//append selected file to form data
		fd.append("photo",file);//file==blob
    console.log(file)
    axios.post('http://localhost:4089/admins/add-product',fd,{headers:{"Authorization":"Bearer "+token}})
    .then(response=>{
      setShowAddProduct(!showAddProduct)
      if(response.status===201){
        setMessage(response.data.message)
      }
      else{
        setMessage("error")
      }
      setTimeout(()=>{
            setMessage("")
      },15000)
    })
    .catch(err=>{
      setShowAddProduct(!showAddProduct)
      setMessage(err)
      setTimeout(()=>{
        setMessage("")
      },15000)
    })
	}
  
  const handleDelProduct=(productId)=>{
    let token=localStorage.getItem("token")
    console.log(productId)
    axios.post('http://localhost:4089/admins/delete-product',productId,{headers:{"Authorization":"Bearer "+token}})
    .then(response=>{
      setShowDelProduct(!showDelProduct)
      if(response.status===201){
        setMessage(response.data.message)
      }
      else{
        setMessage(response.data.message)
      }
      setTimeout(()=>{
            setMessage("")
      },15000)
    })
    .catch(err=>{
      setShowDelProduct(!showDelProduct)
      setMessage(err.message)
      setTimeout(()=>{
        setMessage("")
      },15000)
    })
	}

  //on file select
  const onFileSelect=(e)=>{
		setFile(e.target.files[0])
  }
  return (
    <div>
    <div className=' justify-content-between mx-auto w-50 d-flex justify-content-around mt-3'>
    <button className='admin_btn btn btn-dark mt-3 w-25 fw-bold' onClick={handleShowAddProduct}>Add Product</button>
    <button className='admin_btn btn btn-dark mt-3 w-25 fw-bold' onClick={handleShowDelProduct}>Remove Product</button>
    </div>
    {showAddProduct && <form className='mx-auto w-75' onSubmit={handleSubmit(handleAddProduct)}>
      {/*item id field */}
        <div className='mb-3'>
            <lable htmlFor="pid" className="me-4">Give a unique id</lable>
            <input type='integer' name='pid' id='pid' className='form-control w-75 mx-auto' placeholder='Enter Id'
            {...register("pid",{required:true})}></input>
            {/*Validation error message */}
            {errors.pid?.type==="required"&&<p className='text-danger'>Item id is required</p>}
        </div>
        {/*item name field */}
        <div className='mb-3'>
            <lable htmlFor="name" className="me-4">Item</lable>
            <input type='text' name='name' id='name' className='form-control w-75 mx-auto' placeholder='Enter Item Name'
            {...register("name",{required:true})}></input>
            {/*Validation error message */}
            {errors.name?.type==="required"&&<p className='text-danger'>Item name is required</p>}
        </div>
        
        {/*brand field */}
        <div className='mb-4'>
          <lable htmlFor="brand" className="me-4">Brand</lable>
          <input type='text' name='brand' id='brand' className='form-control w-75 mx-auto' placeholder='Enter Brand'
          {...register("brand",{required:true})}>
          </input>
          {/*Validation error message */}
          {errors.brand?.type==="required"&&<p className='text-danger'>Brand is required</p>}
        </div>

        {/*price field */}
        <div className=' mb-4'>
          <lable htmlFor="price" className="me-4">Price</lable>
          <input type='number' name='price' id='price' className='form-control w-75 mx-auto' placeholder='Enter Price'
          {...register("price",{required:true})}>
          </input>
          {/*Validation error message */}
          {errors.price?.type==="required"&&<p className='text-danger'>Price is required</p>}
        </div>

        {/*color field */}
        <div className='mb-4'>
          <lable htmlFor="color" className="me-4">Color</lable>
          <input type='text' name='color' id='color' className='form-control w-75 mx-auto' placeholder='Enter Color'
          {...register("color",{required:true})}>
          </input>
          {/*Validation error message */}
          {errors.color?.type==="required"&&<p className='text-danger'>Color is required</p>}
        </div>

        {/*size field */}
        <div className='mb-4'>
          <lable htmlFor="size" className="me-4">Size</lable>
          <input type='text' name='size' id='size' className='form-control w-75 mx-auto' placeholder='Enter Size'
          {...register("size",{required:true})}>
          </input>
          {/*Validation error message */}
          {errors.size?.type==="required"&&<p className='text-danger'>Size is required</p>}
        </div>

        {/*description field */}
        <div className='mx-auto mb-4'>
          <lable htmlFor="description" className="me-4">Description</lable>
          <textarea name='description' id='description' className='form-control w-75 mx-auto' placeholder='Describe here'
          {...register("description",{required:true})}>
          </textarea>
          {/*Validation error message */}
          {errors.description?.type==="required"&&<p className='text-danger'>Description is required</p>}
        </div>

        {/*image field */}
        <div className='mx-auto mb-4'>
          <label htmlFor='image'>Select profile picture</label>
          <input type="file" id="image" className='form-control w-75 mx-auto'
          {...register("image",{required:true})} onInput={onFileSelect}></input>
          {/*Validation error message */}
          {errors.image?.type==="required"&&<p className='text-danger'>Profile picture is required</p>}
        </div>
        <button type="submit" className='btn d-flex btn-primary mx-auto'>Add Product</button>
        
      </form>}

      {showDelProduct && <form className='mx-auto w-75' onSubmit={handleSubmit(handleDelProduct)}>
      {/*item id field */}
        <div className='mb-3'>
            <lable htmlFor="pid" className="me-4">Enter product id to delete the product</lable>
            <input type='number' name='pid' id='pid' className='form-control w-75 mx-auto' placeholder='Enter Id'
            {...register("pid",{required:true})}></input>
            {/*Validation error message */}
            {errors.pid?.type==="required"&&<p className='text-danger'>Item id is required</p>}
        </div>
        <button type="submit" className='btn d-flex btn-primary mx-auto'>Delete Product</button>
        
      </form>}
      {message.length !== 0 && (
        <p className='text-center display-4 text-secondry'>{message}</p>
      )}
    </div>
  )
}

export default ManageProducts;