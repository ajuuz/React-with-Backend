import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../../Components/Header/Header";
import { useSelector } from "react-redux";
import './UserProfile.css'
const UserProfile = () => {
  const [userProfileDetails,setUserProfileDetails]=useState()
  const {currentUser} = useSelector((state)=>state.user)

  useLayoutEffect(()=>{
    async function fetchProfileData(){
      try{
       const res = await fetch(`/api/user/getuser/${currentUser._id}`);
       const data =await res.json();
       console.log(data)
       setUserProfileDetails(data);
      }
      catch(error){
        console.log("error in profile page",error)
      }
    }
    fetchProfileData()
  },[])
  return (
    <div>
      <Header />
      <div className="mt-20">
        <img
          className="mx-auto w-52 h-52 profile-image"
          src={userProfileDetails?.imagePath?`http://localhost:3000/uploads/${userProfileDetails.imagePath}`:`https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.1297763733.1729555200&semt=ais_hybrid`}
          alt="profile pic"
        />
        <div className="text-center font-serif font-bold text-3xl">{userProfileDetails?.name}</div>
        <div className="text-center font-mono p-3">Username: {userProfileDetails?.username}</div>
        <div className="text-center font-mono p-3">Email: {userProfileDetails?.email}</div>
        <div className="text-center font-mono p-3">Phone number: {userProfileDetails?.phone}</div>
      </div>
      <div className="text-center">
        <button className="py-2 px-8 bg-blue-300 text-white font-mono hover:bg-blue-600 rounded-lg mt-8">Edit Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
