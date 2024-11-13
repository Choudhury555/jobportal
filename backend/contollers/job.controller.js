import { Job } from "../models/job.model.js";

export const postJob = async(req,res)=>{
    try {
        const {title,description,requirements,salary,experienceLevel,location,jobType,position,companyId} = req.body;
        const userId = req.id;//this will come from authentication middleWare

        if(!title || !description || !requirements || !salary || !experienceLevel || !location || !jobType  || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            experienceLevel,
            location,
            jobType,
            position,
            company:companyId,
            created_by:userId
        })

        return res.status(201).json({
            message:"Job Created",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}



export const getAllJobs = async (req,res)=>{
    try {
        // console.log(req.query.keyword);
        const keyword = req.query.keyword || "";

        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        };
        
        const jobs = await Job.find(query).populate({path:"company"}).sort({createdAt:-1});

        if(!jobs){
            return res.status(404).json({
                message:"No Jobs found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Here are the Jobs you searched for",
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}




export const getJobById = async (req,res)=>{
    try {
        const jobid = req.params.id;
        const job = await Job.findById(jobid).populate({
            path:"applications"
        });

        if(!job){
            return res.status(404).json({
                message:"No Job found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Here is the Job you searched for",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}



//API to find the jobs which is created by an ADMIN
export const getJobsCreatedByAdmin = async (req,res)=>{
    try {
        const adminId = req.id;//this will come from authentication middleWare
        const jobs = await Job.find({created_by:adminId});

        if(!jobs){
            return res.status(404).json({
                message:"You have not created any Job",
                success:false
            })
        }

        return res.status(200).json({
            message:"These are the Jobs created by you",
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
