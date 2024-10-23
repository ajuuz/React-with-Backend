import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

// Redux - toolkit use
import { useSelector,useDispatch } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../../../redux/user/userSlice";

const UserSignIn = () => {
  const [formData, setFormData] = useState({});
  // accessing the redux state initialize selector
  const {loading,error} = useSelector((state)=>state.user)
  // for navigation
  
  const navigate = useNavigate();
  
  //initializing dispatch
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // dispatch siginStart start loading
    dispatch(signInStart())
    try{
    const res = await fetch("/api/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    
    if (data.success === false) {
        
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data))
    navigate('/')
  }
  catch(error){
    dispatch(signInFailure(data.message));
      return;
  }
  };

  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
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
        <div className="flex gap-2 mt-5">
          <p>Dont have an Account ?</p>
          <Link to="/auth/user/signup">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </div>
        <p className="text-red-500 font-bold mt-3 text-center">
          {error ? error : ""}
        </p>
      </div>
    </div>
  );
};

export default UserSignIn;
