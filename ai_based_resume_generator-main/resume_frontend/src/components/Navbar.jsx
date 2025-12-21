import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBrain } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation(); 
  const isActive = (path) => {
    return location.pathname === path ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-500";
  };

  return (
    <div className="navbar bg-white shadow-sm px-4 md:px-10 border-b border-gray-200 sticky top-0 z-50">
      
      {/* Logo Section */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl normal-case flex items-center gap-2 text-gray-800 hover:bg-transparent">
          <FaBrain className="text-blue-600 text-2xl" />
          <span className="font-bold">Gen Z Resume Builder</span>
        </Link>
      </div>

      {/* Menu Links */}
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2 md:gap-4 text-base font-medium">
          
          <li><Link to="/" className={isActive("/")}>Home</Link></li>
          
          <li><Link to="/about" className={isActive("/about")}>About</Link></li>
          
          {/* 👇 SERVICES BUTTON ADDED HERE */}
          <li><Link to="/services" className={isActive("/services")}>Services</Link></li>
          
          <li><Link to="/contact" className={isActive("/contact")}>Contact</Link></li>
        </ul>

        {/* Call to Action Button (Resume) */}
        <Link to="/generate-resume" className="btn bg-blue-600 hover:bg-blue-700 text-white border-none rounded-full ml-4 px-6 shadow-md hover:shadow-lg transition-all">
          Create Resume
        </Link>
      </div>
    </div>
  );
};

export default Navbar;