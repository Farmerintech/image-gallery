import Joi from "joi";

export const regLoginSchema = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required().min(8)

})