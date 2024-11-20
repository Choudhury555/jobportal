import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();//calling custom hooks (like calling a function)
  //below code till return we have to do it here(previously my thinking was to navigate in <Login /> page to '/admin/companies' if role is 'recruiter' but but but that's not the right way)
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    //after login our code will come to this component <Home /> and here it will run this "useEffect" first(if role is 'recruiter' then it will navigate to '/admin/companies')
    if(user?.role === 'recruiter'){
      navigate("/admin/companies");
    }
  },[])

  return (
    <div>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
    </div>
  )
}

export default Home