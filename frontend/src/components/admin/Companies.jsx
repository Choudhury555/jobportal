import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'

const Companies = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <Input className="w-fit" placeholder="Filter By Name" />
                    <Button>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies