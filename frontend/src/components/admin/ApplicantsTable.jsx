import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';

const shortlistingStatusArr = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
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
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <tr>
                        <TableCell>Fulll Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Resume</TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    {
                                        shortlistingStatusArr.map((status, index) => {
                                            return (
                                                <div key={index} className='flex items-center w-fit my-2 cursor-pointer'>
                                                    <span>{status}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </tr>
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable