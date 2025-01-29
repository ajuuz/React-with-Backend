import { Navigate } from "react-router-dom";
import React from 'react'
import { useSelector } from "react-redux";
const UserLoginAuth = ({children}) => {
  
    const {currentUser} = useSelector((state)=>state.user);
    if(currentUser){
        return <Navigate to={'/'}/>
    }
    return children;
}

export default UserLoginAuth;
