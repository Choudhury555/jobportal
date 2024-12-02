import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSerachedJobText } from '@/redux/jobSlice';


const Browse = () => {

    useGetAllJobs();

    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();

    //this below useEffect I am using for cleanup function (when we will leave this component this cleanup function will execute)
    useEffect(()=>{
        return () =>{
            dispatch(setSerachedJobText(""));
        }
    },[])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Result ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job, index) => (<Job key={job._id} job={job}/>))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse