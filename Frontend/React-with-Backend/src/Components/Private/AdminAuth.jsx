import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AdminAuth = ({children}) => {
  const {currentAdmin} = useSelector((state)=>state.admin)
  console.log(currentAdmin);
  if(currentAdmin)
  {
    return children;
  }
  return <Navigate to={'/admin/signin'}/>
}

export default AdminAuth
