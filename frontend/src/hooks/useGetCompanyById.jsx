import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchCompanyById = async ()=>{
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/getcompany/${companyId}`,{
                    withCredentials:true
                });
                
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanyById();
    },[companyId,dispatch])
}

export default useGetCompanyById