import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Header() {
  return (
    // <nav className="flex justify-between items-center px-6 py-4 text-white  ">
    //   {/* Logo & Navigation Links */}
    //   <div className="flex items-center gap-8">
    //     <p className="font-bold text-xl uppercase">Store</p>

    //     <div className="flex gap-6">
    //       <a href="#" className="p-2 rounded-md transition font-semibold hover:bg-gray-900 bg-transparent">Product</a>
    //       <a href="#" className="p-2 rounded-md transition font-semibold hover:bg-gray-900 bg-transparent">Order</a>
    //     </div> 
    //   </div>

    //   {/* Auth Buttons */}
    //   <div className="flex gap-4">
    //     <button className="px-4 py-2 transition font-semibold hover:bg-gray-900 bg-transparen rounded-md">
    //       Sign In
    //     </button>
    //     <button className="flex items-center gap-1 bg-white px-3 py-2 text-black rounded hover:bg-gray-200 transition" >
    //       Sign Up
    //       <FaArrowRight />
    //     </button>
    //   </div>
    // </nav>
    <nav className="flex justify-between items-center px-6 py-4 text-white relative">
    {/* Logo & Navigation */}
    <div className="flex items-center gap-10">
      <p className="text-white font-bold text-2xl">Store</p>
      <div className="flex gap-8">
        <a href="#" className="p-2 rounded-md transition font-semibold hover:bg-gray-900 bg-transparent">Product</a>
        <a href="#" className="p-2 rounded-md transition font-semibold hover:bg-gray-900 bg-transparent">Order</a>
      </div>
    </div>
  
    {/* Auth Buttons */}
    <div className="flex gap-4">
         <button className="px-4 py-2 transition font-semibold hover:bg-gray-900 bg-transparen rounded-md cursor-pointer">
           Sign In
         </button>
      <button className="flex items-center gap-1 bg-white px-3 py-2 text-black rounded hover:bg-gray-200 transition cursor-pointer" >
        Sign Up
        <FaArrowRight />
      </button>
    </div>
  
    {/* Bottom Border (White) */}
    <div className="absolute  bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
  </nav>
  
  );
}
