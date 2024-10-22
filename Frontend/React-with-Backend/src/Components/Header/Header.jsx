import React from "react";
import Link from "react-router-dom";
const Header = () => {
  return (
    <div className="p-4 bg-blue-400">
      <ul className="flex justify-between">
        <div className="flex w-[20%] justify-around ">
          <Link to="/">
            <li className="font-extrabold font-serif text-xl">Auth App</li>
          </Link>
          <Link to="/">
            <li className="font-semibold">About</li>
          </Link>
        </div>

        <div className="flex w-[20%] justify-between">
          <Link to="/">
            <li className="font-semibold">SignUp</li>
          </Link>
          <Link to="/">
            <li className="font-semibold">Login</li>
          </Link>
          <li className="font-semibold"></li>
        </div>
      </ul>
    </div>
  );
};

export default Header;
