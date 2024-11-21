import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {

    const navigate = useNavigate();

    const {allAdminJobs,searchAdminJobByText} = useSelector(store=>store.job);

    const [filterAdminJobs,setFilterAdminJobs] = useState(allAdminJobs);

    useEffect(()=>{
        const filteredAdminJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((adminjob)=>{
            if(!searchAdminJobByText){
                return true;
            }
            return adminjob?.company?.name?.toLowerCase().includes(searchAdminJobByText.toLowerCase()) || adminjob?.title?.toLowerCase().includes(searchAdminJobByText.toLowerCase());
        })

        setFilterAdminJobs(filteredAdminJobs);
    },[searchAdminJobByText,allAdminJobs])

    return (
        <div>
            <Table>
                <TableCaption>A List of Your Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>COMPANY NAME</TableHead>
                        <TableHead>ROLE</TableHead>
                        <TableHead>DATE</TableHead>
                        <TableHead className="text-right">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterAdminJobs?.map((adminjob) => {
                            return (
                                <tr>
                                    
                                    <TableCell>{adminjob.company.name}</TableCell>
                                    <TableCell>{adminjob.title}</TableCell>
                                    <TableCell>{adminjob.createdAt.split('T')[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={()=>navigate(`/admin/allAdminJobs/${adminjob._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
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

export default AdminJobsTable