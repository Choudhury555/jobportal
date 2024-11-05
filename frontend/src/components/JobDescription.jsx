import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDescription = () => {

    const isApplied = true;

    return (
        <div className='max-w-7xl mx-auto my-10'>
            
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Fullstack Developer</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge variant="outline" className={"text-blue-700 font-bold"}>5 Positions</Badge>
                        <Badge variant="outline" className={"text-[#F83002] font-bold"}>Part Time</Badge>
                        <Badge variant="outline" className={"text-[#7209B7] font-bold"}>21 LPA</Badge>
                    </div>
                </div>
                <Button className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209B7]'}`}>{isApplied ? "Already Applied" : "Apply Now"}</Button>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium my-4 py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>FullStack Developer</span></h1>
                <h1 className='font-bold my-1'>Loaction: <span className='pl-4 font-normal text-gray-800'>Bangalore</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, voluptate?</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>12 LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>5</span></h1>
                <h1 className='font-bold my-1'>Posted date: <span className='pl-4 font-normal text-gray-800'>05-11-2024</span></h1>
            </div>
        </div>
    )
}

export default JobDescription