import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminLoginAuth = ({children}) => {
    const {currentAdmin} = useSelector((state)=>state.admin)
    console.log(currentAdmin);
    if(currentAdmin)
    {
        return <Navigate to={'/admin/dashboard'}/>
    }
    return children;
  }

export default AdminLoginAuth
