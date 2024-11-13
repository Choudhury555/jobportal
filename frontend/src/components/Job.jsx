import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {

    const navigate = useNavigate();

    const daysAgoTimeFunction = (createDate)=>{
        const createdAt = new Date(createDate);
        const currentDate = new Date();
        const timeDifference = currentDate - createdAt;

        return Math.floor((timeDifference)/(1000*60*60*24));
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>

            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoTimeFunction(job?.createdAt) === 0 ? "Today" : daysAgoTimeFunction(job?.createdAt)} day(s) ago</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button>
                    <Avatar>
                        <AvatarImage src="data:image/jpeg;base64,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" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge variant="outline" className={"text-blue-700 font-bold"}>{job?.position}</Badge>
                <Badge variant="outline" className={"text-[#F83002] font-bold"}>{job?.jobType}</Badge>
                <Badge variant="outline" className={"text-[#7209B7] font-bold"}>{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=>navigate(`/description/${job._id}`)} variant="outline">Details</Button>
                <Button className="bg-[blue]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job