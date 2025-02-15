import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTshirt, FaCartArrowDown, FaShoppingBag, FaUserAlt } from "react-icons/fa";

export default function Nav() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex flex-col justify-between items-center h-140 ml-10 p-6 rounded-3xl border border-gray-200">
      {/* Store Name */}
      <div>
        <h1 className="text-cyan-400 font-bold text-xl">
          <Link to="/">Store</Link>
          </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col justify-between text-3xl text-gray-400">
        <Link to="/">
          <FaHome className="mb-6 hover:text-cyan-400" />
        </Link>
        <Link to="/products">
          <FaTshirt className="mb-6 hover:text-cyan-400" />
        </Link>
        <Link to="#">
          <FaShoppingBag className="mb-6 hover:text-cyan-400" />
        </Link>
        <Link to="/orders">
          <FaCartArrowDown className="mb-6 hover:text-cyan-400" />
        </Link>
      </div>

      {/* User Icon with Dropdown (FIXED HOVER ISSUE) */}
      <div
        className="relative"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <FaUserAlt className="text-gray-400 text-3xl hover:text-cyan-400 cursor-pointer" />

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute left-25 bottom-1 transform -translate-x-1/2 mt-2 w-40 bg-white rounded-lg shadow-lg py-2">
            <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Login
            </Link>
            <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
