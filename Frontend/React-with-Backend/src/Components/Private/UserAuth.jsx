import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const UserAuth = ({children}) => {
  const {currentUser} = useSelector((state)=>state.user);
  if(currentUser)
  {
    return children;
  }
  return <Navigate to={'/user/signin'}/>
}

export default UserAuth;
