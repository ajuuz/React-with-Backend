import React, { useEffect } from "react";
import "./AuthComponent.css";

import { useNavigate } from "react-router-dom";

const AuthComponenet = ({ auth }) => {
  const navigate = useNavigate();

  function handleNavigate() {
    if (auth === "USER LOGIN") {
      navigate("/auth/user/signup");
    } else if (auth === "USER SIGNUP") {
      navigate("/auth/user/login");
    }
  }

  const loginFormDiv = (
    <>
      <div>
        <label htmlFor="">Email:</label>
        <input type="email" />
      </div>
      <div>
        <label htmlFor="">Password:</label>
        <input type="password" />
      </div>
    </>
  );
  const signinFormDiv = (
    <>
      <div>
        <label htmlFor="">Name:</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">Email:</label>
        <input type="email" />
      </div>
      <div>
        <label htmlFor="">Phone :</label>
        <input type="number" />
      </div>
      <div>
        <label htmlFor="">UserName:</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">Password:</label>
        <input type="password" />
      </div>
    </>
  );

  return (
    <div className="AuthComponent-outerContainer h-[92vh] w-[100%] bg-blue-300 flex justify-center items-center">
      <div className="AuthComponent-innerContainer  md:flex  rounded-xl font-semibold shadow-2xl">
        {/* first div */}
        <div className="p-5 text-center flex justify-center items-center  rounded-t-xl md:rounded-s-xl md:rounded-tr-none bg-blue-400">
          <div>
            {/* conditional rendering based on auth */}
            <h1 className="text-white text-2xl mb-4">
              {auth === "USER SIGNUP"
                ? "Already Have an Account"
                : auth === "USER LOGIN"
                ? "Don't Have An Account"
                : "Welcome Admin Please Signup"}
            </h1>

            {/* if auth is admin login no need of button */}
            {auth === "ADMIN LOGIN" ? null : (
              <button
                onClick={handleNavigate}
                className="text-white text-lg p-3 rounded-xl hover:bg-red-500 AuthComponent-secondDiv"
              >
                {auth === "USER SIGNUP" ? "Login" : "Create Account"}
              </button>
            )}
          </div>
        </div>
        {/* first div ends */}

        {/* form starts */}
        <div className="form-container rounded-b-xl md:rounded-r-xl md:rounded-bl-none bg-white p-7 ">
          <h1 className="text-center">{auth}</h1>
          <form action="">
            {auth==="USER SIGNUP"?signinFormDiv:loginFormDiv}
            <div id="btn">
              <button className="bg-blue-300 py-2 px-4 rounded-md">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        {/* form ends */}
      </div>
    </div>
  );
};

export default AuthComponenet;
