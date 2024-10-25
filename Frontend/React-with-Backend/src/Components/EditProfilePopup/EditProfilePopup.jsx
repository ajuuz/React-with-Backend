import React, { useEffect, useState } from 'react'
import './EditProfilePopup.css'
import { useNavigate } from 'react-router-dom';

const EditProfilePopup = ({popupType,popupRef,currentUser,popupping}) => {
    
    const [edittedFieldData,setEdittedFieldData]=useState(popupType.value);
    const [error,setError] = useState(null);
    const navigate = useNavigate()
   
     const handleChange =(e)=>{
        setEdittedFieldData(e.target.value)
    }

    function validate(){
        if(edittedFieldData.trim()==='')
        {
            return {error:true , message:'field should not be null'};
        }
        else if(edittedFieldData===popupType.value)
        {
            return {error:true , message:"you haven't changed anything"};
        }
        return {error:false};
    }
    const handleEditSubmit=async(e)=>{
        e.preventDefault();
        const validateData = validate();
        if(validateData.error)
        {
            setError(validateData.message);
            return;
        }
        setError(false)
        const res = await fetch(`/api/user/edituser/${currentUser._id}/${popupType.key}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json", // Set content type to JSON
            },
            body:JSON.stringify({edittedFieldData})
        })
        const data = await res.json();
        if(!res.ok){
            setError(data.message)
            return;
        }
        
        navigate('/user/profile',{state:`${popupType.key} updated successfully`})
        popupping(null)
    }

  return (
    <div ref={popupRef} className='absolute w-[500px] left-[50%] translate-x-[-50%] p-5 bg-slate-400'>
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-6 EditProfilePopup-form">
            <p className='text-center text-white'>Change {popupType.key}</p>
          <input
            type="text"
            placeholder="Enter your Name"
            value={edittedFieldData}
            id="name"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          
        {
        error 
        ?<p className='text-red-400 text-center'>{error}</p>
        :""
        }
          <button
            // disabled={loading}
            className="bg-slate-700 text-white rounded-lg uppercase hover:bg-opacity-95 p-3 disabled:bg-opacity-80"
          >
            EDIT
          </button>
        </form>
    </div>
  )
}

export default EditProfilePopup;
