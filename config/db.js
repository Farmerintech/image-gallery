import mongoose from "mongoose";

export const connectDB = async () => {
    try {
       await  mongoose.connect(process.env.MONGO_URI|| "mongodb://127.0.0.1:27017/image-upload-api");
        console.log("MongoDb connected successfully...")
        return
    } catch (error) {
        console.error(` error connecting to mongoDB ${error}`)
        process.exit(1)
    }
}