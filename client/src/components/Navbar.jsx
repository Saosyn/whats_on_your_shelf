import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <>
      <div className="h-24 bg-white shadow-md flex items-center justify-center mb-10">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="w-10 h-10 mr-3" />
        <h2 className="font-bold text-lg">Whats On Your Shelf</h2>
      </Link>
        <div>
          <ul className="flex flex-wrap ml-12 align-middle text-gray-800">
            <li className="mr-4  hover:bg-[#FF7272] hover:text-lg hover:text-white transition-all duration-300 p-2 rounded">
              <Link to="/results">Book Search</Link>
            </li>
            <li className="mr-4  hover:bg-[#FF7272] hover:text-lg hover:text-white transition-all duration-300 p-2 rounded">
              <Link to="/library">Library</Link>
            </li>
            <li className="mr-4 hover:bg-[#FF7272] hover:text-lg hover:text-white transition-all duration-300 p-2 rounded">
              <Link to="/signin">Sign In</Link>
            </li>
            <li className="mr-4  hover:bg-[#FF7272] hover:text-lg hover:text-white transition-all duration-300 p-2 rounded">
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
