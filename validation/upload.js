import Joi from "joi";

export const UploadSchema = Joi.object({
    name:Joi.string().required().min(3),
    description:Joi.string().required().min(3),
    

})