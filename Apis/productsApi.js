//create mini express app
const exp=require('express')
const expressAsyncHandler = require('express-async-handler')
const productsApi=exp.Router()

//parser
productsApi.use(exp.json())

productsApi.get('/get-products',expressAsyncHandler(async(request,response)=>{
    const petProductsCollection=request.app.get('petProductsCollection')
    petProductsCollection.find().toArray()
    .then(products=>{
        console.log(products)
        response.status(201).send({message:"Products",payload:products})})
}))

productsApi.get('/get-item/:id',expressAsyncHandler(async(request,response)=>{
    //get requested product's id
    let id=(+request.params.id)
    const petProductsCollection=request.app.get('petProductsCollection')
    let item=await petProductsCollection.findOne({pid:id})
    if(item===null){
        response.send({message:"requested item doesn't exist"})
    }else{
        response.send({message:"product",payload:item})
    }
}))

module.exports=productsApi