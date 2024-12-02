import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSerachedJobText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

    const [input,setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () =>{
        dispatch(setSerachedJobText(input));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Serach Website</span>
                <h1 className='text-5xl font-bold'>Serach, Apply and <br />Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloribus iusto facere quam quaerat.</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input type="text" placeholder='Find your dream jobs' className='outline-none border-none w-full' onChange={(e)=>setInput(e.target.value)}/>
                    <Button className="rounded-r-full bg-[blue]" onClick={searchJobHandler}>
                        <Search className='h-5 w-5'/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection