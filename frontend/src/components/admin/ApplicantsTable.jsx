import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortlistingStatusArr = ["Accepted", "Rejected"];

const ApplicantsTable = () => {

    const { allApplicants } = useSelector(store => store.application);

    const shortlistingStatusHandler = async (id,status) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/updatestatus/${id}/update`,{status},{
                headers:{
                    "Content-Type":'application/json'
                },
                withCredentials:true
            });
            
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>List of Applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Application Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allApplicants && allApplicants?.applications?.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <TableCell>{item?.applicant?.fullname}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell>
                                        {
                                            item?.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} target='_blank' className="text-blue-600 cursor-pointer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>No Resume</span>
                                        }
                                    </TableCell>
                                    <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {
                                                    shortlistingStatusArr.map((status, index) => {
                                                        return (
                                                            <div key={index} className='flex items-center w-fit my-2 cursor-pointer' onClick={()=>shortlistingStatusHandler(item._id,status)}>
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable