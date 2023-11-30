//import express module
const exp=require("express")
const app=exp()
app.listen(4089,()=>console.log("server running on port 4089"))

//connect express with react build
const path=require("path")//core module
app.use(exp.static(path.join(__dirname,'./build')))

//importing euseful modules
const expressAsyncHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")

// connecting to the mongodb database
const mclient=require('mongodb').MongoClient
mclient.connect('mongodb://127.0.0.1:27017')
.then(dbRef=>{
    let dbObj=dbRef.db('petservicesappdb')
    
    //create products collection object
    let petProductsCollection=dbObj.collection('petProductsCollection')
    //share collection object to apis
    app.set('petProductsCollection',petProductsCollection)

    //create users collection object
    let usersCollection=dbObj.collection('usersCollection')
    //share collection object to apis
    app.set('usersCollection',usersCollection)

    //create admins collection object
    let adminsCollection=dbObj.collection("adminsCollection")
    app.set("adminsCollection",adminsCollection)
    console.log("Successfully connected to the database")

})
.catch(err=>console.log("DataBase connection error is",err))

//import products api
const productsApi=require("./Apis/productsApi")
app.use('/products',productsApi)

//import users api
const usersApi=require("./Apis/usersApi")
app.use('/users',usersApi)

//import admins api
const adminsApi=require("./Apis/adminsApi")
app.use('/admins',adminsApi)

//parsing
app.use(exp.json())

//user login
app.post("/login",expressAsyncHandler(async(request,response)=>{
    let userCred=request.body
    console.log(userCred)
    //object of users collection
    const usersCollection=app.get("usersCollection")
    //object of admins collection
    const adminsCollection=app.get("adminsCollection")

    //searching for the username 
    let userOfDB=await usersCollection.findOne({username:userCred.username})
    let adminOfDB= await adminsCollection.findOne({username:userCred.username})
    console.log(adminOfDB,userOfDB)

    if(userOfDB==null && adminOfDB==null)
    {
        response.send({message:"Invalid Username"})
    }
    else if(userOfDB==null)
    {
        let isEqual=await bcryptjs.compare(userCred.password,adminOfDB.password)
        if(isEqual==false){
            response.send({message:"Invalid Password"})
        }
        else{

            let jwtToken=jwt.sign({username:adminOfDB.userame},"abcdefghijklm",{expiresIn:"1d"})
            response.status(201).send({message:"admin",payload:jwtToken,user:adminOfDB})
        }
        
    }
    else if(adminOfDB==null)
    {
        let isEqual=await bcryptjs.compare(userCred.password,userOfDB.password)
        if(isEqual==false){
            response.send({message:"Invalid Password"})
        }
        else{

            let jwtToken=jwt.sign({username:userOfDB.userame},"nopqrstuvwxyz",{expiresIn:"1d"})
            response.status(201).send({message:"user",payload:jwtToken,user:userOfDB})
        }
    }
   

}))


