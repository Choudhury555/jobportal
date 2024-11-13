import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setJobById } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const JobDescription = () => {

    
    const params = useParams();
    const jobId = params.id;
    
    const dispatch = useDispatch();
    
    const {jobById} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    // console.log(jobById.applications[0].application.applicant);
    
    const isApplied = jobById?.applications?.some(application=>application.applicant === user._id) || false;

    useEffect(()=>{
        const fetchJobById = async ()=>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getjobbyid/${jobId}`,{
                    withCredentials:true
                });
                
                if(res.data.success){
                    dispatch(setJobById(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobById();
    },[jobId,dispatch,user?._id])//when "jobId" will change for different job this useEffect will be called

    return (
        <div className='max-w-7xl mx-auto my-10'>
            
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{jobById?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge variant="outline" className={"text-blue-700 font-bold"}>{jobById?.position}</Badge>
                        <Badge variant="outline" className={"text-[#F83002] font-bold"}>{jobById?.jobType}</Badge>
                        <Badge variant="outline" className={"text-[#7209B7] font-bold"}>{jobById?.salary} LPA</Badge>
                    </div>
                </div>
                <Button className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209B7]'}`}>{isApplied ? "Already Applied" : "Apply Now"}</Button>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium my-4 py-4'>{jobById?.description}</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{jobById?.title}</span></h1>
                <h1 className='font-bold my-1'>Loaction: <span className='pl-4 font-normal text-gray-800'>{jobById?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{jobById?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{jobById?.experienceLevel} years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{jobById?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{jobById?.applications?.length > 0 ? jobById?.applications?.length : "No Applicants"}</span></h1>
                <h1 className='font-bold my-1'>Posted date: <span className='pl-4 font-normal text-gray-800'>{jobById?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription