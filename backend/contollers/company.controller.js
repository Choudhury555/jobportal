import { Company } from "../models/company.model.js";

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
            success:false
        })
        
    } catch (error) {
        console.log(error);
    }
}


export const getCompanyById = async (req,res) =>{
    try {
        const companyId = req.params.id;
        const company = await Company.find({_id:companyId});

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

        const updateData = {name,description,website,location};

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