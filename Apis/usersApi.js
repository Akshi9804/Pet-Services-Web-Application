const exp=require('express')
const usersApi=exp.Router()
const expressAsyncHandler=require('express-async-handler')

//import bcryptjs
const bcryptjs=require('bcryptjs')

//importing modules
const verifyUser=require("./middlewares/verifyUser")

//body parser
usersApi.use(exp.json())

usersApi.post('/register-user',expressAsyncHandler(async(request,response)=>{
    let newUser=request.body

    //get users collection from database
    const usersCollection=request.app.get('usersCollection')
    //get admins collection from database
    const adminsCollection=request.app.get('adminsCollection')

    //checking for duplicate users
    let userOfDB=await usersCollection.findOne({username:newUser.username})
    let adminOfDB=await adminsCollection.findOne({username:newUser.username})

    if(userOfDB!==null || adminOfDB!==null)
    {
        response.status(200).send({message:"user already existed"})
    }
    else
    {
        let hashedPassword=await bcryptjs.hash(newUser.password,10)
        //replace password with hashed password
        newUser.password=hashedPassword
        newUser.user="customer"
        newUser.cart=[]
        newUser.wishList=[]
        console.log(newUser)
        await usersCollection.insertOne(newUser)
        response.status(201).send({message:"user registered"})
    }
}))

usersApi.get('/add-to-cart/:username/:id',verifyUser,expressAsyncHandler(async(request,response)=>{
    let user=request.params.username
    let id=(+request.params.id)
    //get users collection from database
    const usersCollection=request.app.get('usersCollection')
    //get products collection from database
    const petProductsCollection=request.app.get('petProductsCollection')
    let item=await petProductsCollection.findOne({pid:id})
    if(item===null){
        response.send({message:"item does not exist"})
    }else{
        let userOfDB=await usersCollection.findOne({username:user})
        let modifiedUser=userOfDB
        if(modifiedUser.cart===undefined){
            modifiedUser.cart=[]
        }
        modifiedUser.cart.push(item)
        await usersCollection.updateOne({username:userOfDB.username},{$set:{...modifiedUser}})
        response.send({message:"item added to cart"})
    }
}))

usersApi.delete('/delete-from-cart/:username/:id',verifyUser,expressAsyncHandler(async(request,response)=>{
    let user=request.params.username
    let id=(+request.params.id)
    //get users collection from database
    const usersCollection=request.app.get('usersCollection')
    
    let userOfDB=await usersCollection.findOne({username:user})
    let modifiedUser=userOfDB
    let i=modifiedUser.cart.findIndex((element)=>element.pid=id)
    modifiedUser.cart.splice(i,1)
    await usersCollection.updateOne({username:userOfDB.username},{$set:{...modifiedUser}})
    response.send({message:"item deleted from cart"})

}))



module.exports=usersApi