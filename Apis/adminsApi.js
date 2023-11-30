const exp=require('express')
const adminsApi=exp.Router()
const useParams=require('react-router-dom')


//importing modules
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const multerObj=require("./middlewares/cloud")

//parser
adminsApi.use(exp.json())

//verify admin middleware
const verifyAdmin=require('./middlewares/verifyAdmin')

adminsApi.post('/register-admin',verifyAdmin,expressAsyncHandler(async(request,response)=>{
    let newAdmin=request.body
    console.log(newAdmin)
    //get admins collection from database
    const adminsCollection=request.app.get('adminsCollection')
    //get users collection from database
    const usersCollection=request.app.get('usersCollection')

    //checking for duplicate users
    let userOfDB=await usersCollection.findOne({username:newAdmin.username})
    let adminOfDB=await adminsCollection.findOne({username:newAdmin.username})

    if(userOfDB!==null || adminOfDB!==null)
    {
        response.status(200).send({message:"user already existed"})
    }
    else
    {
        let hashedPassword=await bcryptjs.hash(newAdmin.password,15)
        //replace password with hashed password
        newAdmin.password=hashedPassword
        newAdmin.user="admin"
        console.log(newAdmin)
        await adminsCollection.insertOne(newAdmin)
        response.status(201).send({message:"Succesfully added admin"})
    }
}))

adminsApi.get('/get-admins',verifyAdmin,expressAsyncHandler(async(request,response)=>{
    //get admins collection from database
    const adminsCollection=request.app.get('adminsCollection')
    adminsCollection.find().toArray()
    .then(admins=>{
        response.status(201).send({message:"Admins",payload:admins})})
}))

adminsApi.post('/add-product',[verifyAdmin,multerObj.single('photo')],expressAsyncHandler(async(request,response)=>{
    const newProduct=JSON.parse(request.body.product)
    console.log(newProduct)
    newProduct.image=request.file.path;
    //get products collection
    const petProductsCollection=request.app.get('petProductsCollection')
    await petProductsCollection.insertOne(newProduct)
    response.status(201).send({message:"product added",payload:newProduct})
}))

adminsApi.post('/delete-product',verifyAdmin,expressAsyncHandler(async(request,response)=>{
    let item_id=request.body.pid
    console.log(item_id)
    const petProductsCollection=request.app.get('petProductsCollection')
    let product=await petProductsCollection.findOne({pid:item_id})
    console.log(product)
    if(product===null){
        response.send({message:"Item doesn't exist"})
    }else{
        await petProductsCollection.deleteOne({pid:item_id})
        response.status(201).send({message:"Item successfully deleted"})
    }
}))





module.exports=adminsApi