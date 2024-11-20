import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {

    useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input,setInput] = useState("");

    //for each key press (input change) useEffect will run
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));//it will update the store on each "input" change(then in <CompaniesTable/> we will fectch this "input" to filter)
    },[input])

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <Input className="w-fit" placeholder="Filter By Name" onChange={(e)=>setInput(e.target.value)}/>
                    <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies