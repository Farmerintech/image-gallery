import mongoose from "mongoose"

const UploadSchema =  mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    }
})

const UploadModel = mongoose.model("image", UploadSchema);
export default UploadModel