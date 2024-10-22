import React from "react";
import { Link } from "react-router-dom";

const UserSignUp = () => {
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Enter your Name"
            id="name"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Enter your Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <input
            type="number"
            placeholder="Enter your Phone number"
            id="phone"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Enter a username"
            id="username"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <button  className="bg-slate-700 text-white rounded-lg uppercase hover:bg-opacity-95 p-3 disabled:bg-opacity-80">Sign Up</button>
        </form>
        <div className="flex gap-2 mt-5">
        <p>Have an Account ?</p>
        <Link to='auth/user/signin'><span className="text-blue-500">Sign In</span></Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
