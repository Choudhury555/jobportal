import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req,res)=>{
     try {
        const userId = req.id;//this will come from authentication middleWare
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message:"Job Id is required",
                success:false
            })
        }

        const existingApplication = await Application.findOne({job:jobId,applicant:userId});//if both have one combination found then user already applied for that job

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false
            })
        }

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        })
        
        job.applications.push(newApplication._id);//here we are pushing our newly created application to specific job
        await job.save();

        return res.status(201).json({
            message:"You have successfully applied for this job",
            success:true
        })
     } catch (error) {
        console.log(error);
     }
}

//for Applicants
export const getAllApplicationsYouApplied = async (req,res)=>{
    try {
        const userId = req.id;//this will come from authentication middleWare


        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',//it will populate the job data(which is inside Application model)
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',//it will populate compoany data(which is inside Job model)
                options:{sort:{createdAt:-1}}
            }
        });


        if(!applications){
            return res.status(404).json({
                message:"No Application Found",
                success:false
            })
        }


        return res.status(200).json({
            message:"Here is your applied job list below",
            applications,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


//for ADMIN
export const getAllApplicants = async (req,res) =>{
    try {
        const jobId = req.params.id;

        const allApplicants = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        })

        if(!allApplicants){
            return res.status(404).json({
                message:"No Applicants Found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Here are all the applicants applied for this job",
            allApplicants,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}



export const updateStatus = async (req,res)=>{
    try {
        const {status} = req.body;

        const applicationId = req.params.id;

        if(!status){
            return res.status(400).json({
                message:"status is required",
                success:false
            })
        }

        const application = await Application.findOne({_id:applicationId});

        if(!application){
            return res.status(404).json({
                message:"Application not Found",
                success:false
            })
        }

        application.status = status.toLowerCase();//"toLowercase" because in Application model status is in lower case(enum:['pending','accepted','rejected'])
        await application.save();

        return res.status(200).json({
            message:"Status Updated for the Application",
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}