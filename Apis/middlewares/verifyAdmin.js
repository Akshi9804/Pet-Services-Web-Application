
const jwt=require('jsonwebtoken')

const verifyAdmin=(request,response,next)=>{
    //get bearer token from request
    let bearerToken=request.headers.authorization

    //if bearer token does not exist
    if(bearerToken===undefined){
        response.send({message:"Unauthorized request"})
    }
    else{
        let token=bearerToken.split(" ")[1]
        try{
            jwt.verify(token,"abcdefghijklm")
            next()
        }catch{
            response.send({message:err.message})
        }
    }

}

module.exports=verifyAdmin;