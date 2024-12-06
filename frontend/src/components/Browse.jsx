import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSerachedJobText } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Browse = () => {

    useGetAllJobs();

    const {allJobs} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //this below useEffect I am using for cleanup function (when we will leave this component this cleanup function will execute)
    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
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
                        allJobs.map((job, index) => (
                        <motion.div
                            initial={{opacity:0,x:100}}
                            animate={{opacity:1,x:0}}
                            exit={{opacity:0,x:-100}}
                            transition={{duration:0.4}}
                          >
                                <Job key={job._id} job={job}/>
                            </motion.div>
                            )
                          )
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse