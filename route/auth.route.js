import express from "express"
import { Login, Register } from "../controller/auth.js"
import { validatorMiddleware } from "../middleware/validator.js"
import { regLoginSchema } from "../validation/auth.js"


const authRoute = express.Router()

authRoute.post("/register", validatorMiddleware(regLoginSchema), Register)
authRoute.post("/login", validatorMiddleware(regLoginSchema), Login)


export default authRoute