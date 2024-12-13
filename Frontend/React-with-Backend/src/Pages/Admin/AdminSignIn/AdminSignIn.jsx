import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdminSignInSuccess } from '../../../redux/Admin/adminSlice';
const AdminSignIn = () => {
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)

  const navigate = useNavigate();

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }

  const dispatch = useDispatch();
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true);
    setError(null);
    try{
      const res = await fetch('/api/admin/signin',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      console.log(data);
      setLoading(false)
      if(data.success===false)
      {
        setError(data.message);
        setTimeout(()=>{
          setError(null);
        },5000)
        return;
      }
      dispatch(AdminSignInSuccess(data));
      navigate('/admin/dashboard')
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">ADMIN Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Enter your Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg uppercase hover:bg-opacity-95 p-3 disabled:bg-opacity-80"
          >
            {loading ? "loading..." : "Sign In"}
          </button>
        </form>
        
        <p className="text-red-500 font-bold mt-3 text-center">
          {error ? error : ""}
        </p>
      </div>
    </div>
  )
}

export default AdminSignIn;
