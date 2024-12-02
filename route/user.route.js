import { getUser, getUsers, updateUser, deleteUser, createUser } from "../controller/user.js";
import express from "express"

const userRoute = express.Router();

userRoute.post('/', createUser).get('/', getUsers).get('/:id', getUser)
.put('/:id',  updateUser).delete('/:id', deleteUser)

export default userRoute