import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Header() {
  return (
    <nav className="flex justify-between items-center px-6 py-4  relative">
    {/* Logo & Navigation */}
    <div className="flex items-center gap-10">
      <Link to="/">
        <p className=" font-bold text-2xl p-3 text-cyan-600">Store</p>
      </Link>
      <div className="flex gap-8">
        <Link to="/products" className="p-2 rounded-md transition font-semibold hover:bg-gray-200 bg-transparent">Product</Link>
        <Link to="/orders" className="p-2 rounded-md transition font-semibold hover:bg-gray-200 bg-transparent">Order</Link>
      </div>
    </div>
  
    {/* Auth Buttons */}
    <div className="flex gap-4">
         <button className="px-4 py-2 transition font-semibold hover:bg-gray-200 bg-transparen rounded-md cursor-pointer">
          <Link to="/login">
            Log In
          </Link>
         </button>
      <button className=" bg-white px-3 py-2 text-black rounded hover:bg-gray-200 transition cursor-pointer" >
        <Link to="/signup" className="flex gap-2 items-center ">
          Sign Up
          <FaArrowRight />
        </Link>
      </button>
    </div>
  
    {/* Bottom Border (White) */}
    <div className="absolute  bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
  </nav>
  
  );
}
