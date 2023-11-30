const cloudinary=require("cloudinary").v2
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")



//configure cloudinary
cloudinary.config({
	cloud_name: 'djpxjdlkd',
  	api_key: '257465987884418',
  	api_secret: '5XbjwOK9rsM9JNvpNFnzVXR8o1A'
})

//configure cloudinary storage
let clStorage=new CloudinaryStorage({
	cloudinary:cloudinary,
	params:{
		folder:"petServicesApp/petProducts",
		public_id:(request,file)=>file.fieldname+"-"+Date.now()
	}
})

//configure multer
let multerObj=multer({storage:clStorage})

//export multerObj
module.exports=multerObj;