import mongoose from "mongoose"
import User from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const Register = async (req, res) => {
    try {
        const {username, password} =req.body
        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({message:"Username already exists"})
        }
        const saltRound = await bcrypt.genSalt(10);
        const hashedPsw = await bcrypt.hash(password, saltRound)
        const newUser = await User.create(
            {
                username,
                password:hashedPsw
            }
        );
        return res.status(201).json({message:"Registration successful..", newUser})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}


export const Login = async (req, res) => {
    try {
        const {username, password} = req.body
        const  user = await User.findOne({username})
        if(!user){
            return res.status(404).json({message:"Username does not exit"})
        }
        const confirmPsw = await bcrypt.compare(password, user.password);
        if(!confirmPsw){
            return res.status(404).json({message:"Incorrect password"})
        }
        const token = jwt.sign(
            {
                id:user._id
            },
            process.env.SECRETE_KEY,
            {
                expiresIn:process.env.LIFE_TIME
            }
        ) 
        return res.status(200).json({message:"Login successful..", token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
}

