import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchAdminJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {

    useGetAllAdminJobs();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input,setInput] = useState("");

    //for each key press (input change) useEffect will run
    useEffect(()=>{
        dispatch(setSearchAdminJobByText(input));//it will update the store on each "input" change(then in <CompaniesTable/> we will fectch this "input" to filter)
    },[input])

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <Input className="w-fit" placeholder="Filter By Name,Role" onChange={(e)=>setInput(e.target.value)}/>
                    <Button onClick={()=>navigate("/admin/jobs/create")}>Post New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs