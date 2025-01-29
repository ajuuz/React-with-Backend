import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditPassword = ({pwdPopupRef,currentUser,closePasswordPopup}) => {
    const [passwordDetails,setPasswordDetails] = useState(null);
    const [error,setError]= useState(null)
    const navigate = useNavigate()
    function handleChange(e){
        setPasswordDetails({
            ...passwordDetails,
            [e.target.id]:e.target.value
        })
    }
   async function handlePasswordSubmit(e){
        e.preventDefault();
        setError(null);
        try{
            const res = await fetch(`/api/user/passwordchange/${currentUser._id}`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json", // Set content type to JSON
                },
                body:JSON.stringify(passwordDetails)
            })
            const data = await res.json();
            if(data.success===false)
            {
                setError(data.message)
                return;
            }
            console.log(data.message)
            navigate("/user/profile",{state:data.message});
            closePasswordPopup(false)
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div>
      <div ref={pwdPopupRef} className='absolute w-[500px] left-[50%] translate-x-[-50%] p-5 bg-slate-400'>
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-6 EditProfilePopup-form">
            <p className='text-center text-white'>Change </p>
          <input
            type="text"
            placeholder="Enter your Password"
            id="currentPwd"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          
           <input
          type="text"
          placeholder="Enter your new password"
          id="newPwd"
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
    </div>
  )
}

export default EditPassword
