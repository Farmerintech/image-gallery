import { v2 as cloudinary } from 'cloudinary';
export const connectCloud = ()=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRETE //
})
console.log('connected')
}