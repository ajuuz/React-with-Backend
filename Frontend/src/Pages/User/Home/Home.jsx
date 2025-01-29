import React from "react";
import Header from "../../../Components/Header/Header";
const Home = () => {
  return (
    <div className="">
      <Header />
      <div className="max-w-[50%] mx-auto pt-32">
        <h1 className="text-3xl font-bold text-center  mb-4 text-slate-800">
          Welcome to my Auth App!
        </h1>
        <p className="mb-4 text-slate-700 text-center">
          This is a full-stack web application built with the MERN (MongoDB,
          Express, React, Node.js) stack. It includes authentication features
          that allow users to sign up, log in, and log out, and provides access
          to protected routes only for authenticated users.
        </p>
        <p className="mb-4 text-slate-700 text-center">
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is
          implemented using JSON Web Tokens (JWT).
        </p>
        <p className="mb-4 text-slate-700 text-center">
          This application is intended as a starting point for building
          full-stack web applications with authentication using the MERN stack.
          Feel free to use it as a template for your own projects!
        </p>
      </div>
    </div>
  );
};

export default Home;
