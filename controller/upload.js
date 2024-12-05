import { v2 as cloudinary } from 'cloudinary';
import UploadModel from "../model/upload.model.js";
import mongoose from 'mongoose';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
})
    console.log('Cloudinary connected');

export const uploadImagde = async (req, res) => {
    try {
        const image = req.file;
        const user = req.user; // Assuming authentication middleware sets req.user
        const { name, description } = req.body;

        if (!image) {
            return res.status(400).json({ message: "File upload failed. No file provided." });
        }
        if (!name || !description) {
            return res.status(400).json({ message: "Name and Description are required." });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(image.path, {
            folder: 'uploads',
        });

        // Save the image details to the database
        const newImage = await UploadModel.create({
            image: result.secure_url, // Use Cloudinary secure URL
            name,
            description,
            uploadedBy: user?.id, // Add user ID if authenticated
        });

        return res.status(201).json({ message: "Image uploaded successfully.", data: newImage });
    } catch (error) {
        console.error("Error uploading image:", error.message); // Log error safely
        return res.status(500).json({ message: "Server error.", error: error.message });
    }
};

export const getImages = async (req, res) => {
    try {
        const images = await UploadModel.find().populate('uploadedBy');
        if (images.length === 0) {
            return res.status(404).json({ message: "No images found." });
        }
        return res.status(200).json({ message: "Images retrieved successfully.", images });
    } catch (error) {
        console.error("Error fetching images:", error.message); // Log error safely
        return res.status(500).json({ message: "Server error.", error: error.message });
    }
};

export const getUserImages = async (req, res) => {
    try {
        const images = await UploadModel.find({uploadedBy:new mongoose.Types.ObjectId(req.user)});
        if (images.length === 0) {
            return res.status(404).json({ message: "No images found." });
        }
        return res.status(200).json({ message: "Images retrieved successfully.", images });
    } catch (error) {
        console.error("Error fetching images:", error.message); // Log error safely
        return res.status(500).json({ message: "Server error.", error: error.message });
    }
};

export const updateUserImage = async (req, res) => {
    try {
        const image = await UploadModel.findOne({_id:new mongoose.Types.ObjectId(req.params.id), uploadedBy:new mongoose.Types.ObjectId(req.user)});
        if (!image) {
            return res.status(404).json({ message: "Image not found." });
        }
        const newImage = await UploadModel.findByIdAndUpdate(image._id, req.body, {new:true})
        return res.status(200).json({ message: "Image retrieved successfully.", newImage });
    } catch (error) {
        console.error("Error fetching images:", error.message); // Log error safely
        return res.status(500).json({ message: "Server error.", error: error.message });
    }
};

export const DeleteUserImage = async (req, res) => {
    try {
        if(req.file){
            return res.status(400).json({ message: "You are not allow to update image part." });
        }
        const image = await UploadModel.findOne({_id:new mongoose.Types.ObjectId(req.params.imageId), uploadedBy:new mongoose.Types.ObjectId(req.user)});
        if (!image) {
            return res.status(404).json({ message: "Image not found." });
        }
        const newImage = await UploadModel.findByIdAndDelete(req.params.imageId)
        return res.status(200).json({ message: "Image deleted successfully." });
    } catch (error) {
        console.error("Error fetching images:", error.message); // Log error safely
        return res.status(500).json({ message: "Server error.", error: error.message });
    }
};


