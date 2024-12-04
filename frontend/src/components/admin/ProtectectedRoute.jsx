import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectectedRoute = ({children}) => {

    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user==null || user.role != 'recruiter'){
            navigate("/");
        }
    },[]);

  return (
    <div>{children}</div>
  )
}

export default ProtectectedRoute