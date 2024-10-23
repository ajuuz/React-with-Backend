import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    setError(false);
    const res = await fetch("/api/user/signup", {
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
      return;
    }
    navigate('/auth/user/signin')
  };

  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Enter your Name"
            id="name"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter your Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Enter your Phone number"
            id="phone"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter a username"
            id="username"
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
            {loading ? "loading..." : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an Account ?</p>
          <Link to="/auth/user/signin">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
        <p className="text-red-500 font-bold mt-3 text-center">
          {error ? error : ""}
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
