import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const {allApplicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fecthAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/getallapplicants`, {
                    withCredentials: true
                });

                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.allApplicants));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fecthAllApplicants();
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {allApplicants.applications.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants