import React from 'react'
import LatestJobCards from './LatestJobCards'

const tempJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38c2]'>Latest & Top</span>Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    tempJobs.slice(0,6).map((item, index) => (
                        <LatestJobCards />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestJobs