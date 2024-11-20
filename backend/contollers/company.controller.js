import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async(req,res)=>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            })
        }

        let company = await Company.findOne({name:companyName});

        if(company){
            return res.status(400).json({
                message:"Company name already existed",
                success:false
            })
        }

        company = await Company.create({
            name:companyName,
            userId:req.id//this will come from authentication middleWare
        })

        return res.status(201).json({
            message:"Company registered succesfully",
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}



export const getCompany = async (req,res)=>{
    try {
        const userId = req.id;//this will come from authentication middleWare
        const companies = await Company.find({userId});

        if(!companies){
            return res.status(404).json({
                message:"You have not registered any company",
                success:false
            })
        }

        return res.status(200).json({
            message:"Here is the list of companies you registered",
            companies,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}


export const getCompanyById = async (req,res) =>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);//"findById()" will return a single object and "find()" will return an array of object

        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Here is the company you are looking for",
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


export const updateCompany = async (req,res)=>{
    try {
        const {name,description,website,location} = req.body;

        //cloudinary setup for file upload
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
        
        const updateData = {name,description,website,location,logo};

        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});

        if(!company){
            res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Company information updated",
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}