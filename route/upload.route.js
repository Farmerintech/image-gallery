import express from "express"
import { DeleteUserImage, getImages, getUserImages, uploadImagde } from "../controller/upload.js"
import { authMiddleware } from "../middleware/authorization.js"
import { validatorMiddleware } from "../middleware/validator.js"
import { UploadSchema } from "../validation/upload.js"
import upload from "../middleware/upload.js"
const uploadRoute = express.Router()

uploadRoute.post('/', authMiddleware, upload.single('image'), uploadImagde)


.get('/', getImages)
.get('/:id/images', authMiddleware, getUserImages).delete("/:userId/images/:imageId", authMiddleware, DeleteUserImage)








export default uploadRoute;

