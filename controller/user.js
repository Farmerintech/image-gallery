import mongoose from "mongoose"
import User from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const createUser = async (req, res) => {
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

export const getUsers = async (req, res)=> {
    try {
        const users = await User.find();
        if(!users){
            return res.status(404).json({message:"No user found"})
        }
        return res.status(200).json({message:"All users retrieved", users})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
export const getUser = async (req, res)=> {
    try {
        const _id= req.params.id;
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).json({message:`user with id ${_id}, not found`})
        }
        return res.status(200).json({message:"Users retrieved", user})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export const updateUser = async (req, res)=> {
    try {
        const _id= req.params.id;
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).json({message:`user with id ${_id}, not found`})
        }
        const newuser = await User.findByIdAndUpdate(_id, req.body, {new:true})
        return res.status(200).json({message:"User Updated", newuser})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export const deleteUser = async (req, res)=> {
    try {
        const _id= req.params.id;
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).json({message:`user with id ${_id}, not found`})
        }
       await User.findByIdAndDelete(_id)
        return res.status(200).json({message:"User Deleted"})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}