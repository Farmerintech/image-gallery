import { v2 as cloudinary } from 'cloudinary';
import UploadModel from "../model/upload.model.js";


    cloudinary.config({
        cloud_name:'dtsiyyvu1',
        api_key:'221554665271299',
       api_secret:'-52nBO2q64b55uJE8AYTNw_sQOE'
    });
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
        const images = await UploadModel.find();
        if (images.length === 0) {
            return res.status(404).json({ message: "No images found." });
        }
        return res.status(200).json({ message: "Images retrieved successfully.", images });
    } catch (error) {
        console.error("Error fetching images:", error.message); // Log error safely
        return res.status(500).json({ message: "Server error.", error: error.message });
    }
};



