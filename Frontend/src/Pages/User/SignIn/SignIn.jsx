import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Redux - toolkit use
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../../redux/user/userSlice";

const UserSignIn = () => {
  const [formData, setFormData] = useState({});

  // for setting loading when signing and error if invalid
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // for navigation
  const navigate = useNavigate();
  //for accessing value send through navigate after signup
  const location = useLocation();
  const [UserCreatedMessage, setUserCreatedMessage] = useState(location.state || null);
  
 

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setUserCreatedMessage(null);
      navigate(location.pathname, { replace: true });
    },3000)
    return ()=>{

      clearTimeout(timer);
    }
  },[])
  


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
    setLoading(true);
    setError(false);
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
   
  };

  return (
    <div>
      {UserCreatedMessage
      ?<div className="bg-black text-white inline-block absolute left-[50%] bottom-3 translate-x-[-50%] py-5 px-36">{UserCreatedMessage}</div>
      :null
    }
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">USER Sign In</h1>
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
          <Link to="/user/signup">
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
