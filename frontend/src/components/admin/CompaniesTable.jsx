import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'

const CompaniesTable = () => {

    const { companies } = useSelector(store => store.company);

    return (
        <div>
            <Table>
                <TableCaption>A List of Your Registered Company</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>LOGO</TableHead>
                        <TableHead>NAME</TableHead>
                        <TableHead>DATE</TableHead>
                        <TableHead className="text-right">ACTION</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        companies?.map((company) => {
                            return (
                                <tr>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company.logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div className='flex items-center gap-2 w-fit cursor-pointer'>
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

export default CompaniesTable