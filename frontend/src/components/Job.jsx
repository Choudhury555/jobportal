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
                        <AvatarImage src={job?.company?.logo} />
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