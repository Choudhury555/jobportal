import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { animate, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  useGetAllJobs();
  const {allJobs,serachedJobText} = useSelector(store=>store.job);
  const [filterJobs,setFilterJobs] = useState(allJobs);
  // console.log(serachedJobText);
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(serachedJobText){
      const filteredJobs = allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(serachedJobText.toLowerCase()) 
        || job.description.toLowerCase().includes(serachedJobText.toLowerCase())
        || job.location.toLowerCase().includes(serachedJobText.toLowerCase())

      })
      console.log(filteredJobs);
      
      setFilterJobs(filteredJobs);
    }else{
      setFilterJobs(allJobs);
    }
  },[serachedJobText,allJobs])


  useEffect(()=>{
    if(!user){
      navigate("/login");
    }
  },[])

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterCard />
          </div>
          {
            filterJobs.length <= 0 ? <span>Jobs Not Found</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    filterJobs.map((job) => (
                      <motion.div
                        initial={{opacity:0,x:100}}
                        animate={{opacity:1,x:0}}
                        exit={{opacity:0,x:-100}}
                        transition={{duration:0.4}}
                      >
                        <Job key={job._id} job={job}/>
                      </motion.div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs