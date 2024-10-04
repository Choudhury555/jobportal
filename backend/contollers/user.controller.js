import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{
    try {
        const {fullname,email,phoneNumber,password,role} = req.body;

        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is Missing",
                success:false
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User Already Exist.",
                success:false
            })
        }
        
        const hashPassword = await bcrypt.hash(password,10);
        
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashPassword,
            role
        });

        return res.status(201).json({
            message:"Account Created Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}



export const login = async (req,res)=>{
    try {
        const {email,password,role} = req.body;
        
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is Missing",
                success:false
            })
        }

        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"Incorrect Email/Password",
                success:false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect Email/Password",
                success:false
            })
        }

        if(role !== user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current Role",
                success:false
            })
        }

        const tokenData = {
            userId:user._id
        }

        const token = await jwt.sign(tokenData,process.env.SECRET_KRY,{expiresIn:'1d'});

        const userReturndata = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000 , httpsOnly:true, sameSite:'strict'}).json({
            message:`Welcome Back ${user.fullname}`,
            user:userReturndata,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}



export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Loggedout Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}



export const updateProfile = async(req,res)=>{
    try {
        const {fullname,email,phoneNumber,bio,skills} = req.body;

        if(!fullname || !email || !phoneNumber || !bio || !skills){
            return res.status(400).json({
                message:"Something is Missing",
                success:false
            })
        }
        
        const skillsArray = skills.split(",");

        const userId = req.id;//this will come from authentication middleWare

        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"User Not Found",
                success:false
            })
        }

        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;
        
        await user.save();
        
        const userReturndata = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"Profile Updated Successfully",
            user:userReturndata,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}