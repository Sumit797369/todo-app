import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsLogin,setSearch }) => {
   const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    // console.log(localStorage.getItem("token"));

    setIsLogin(false);
    navigate("/login");
  };
  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm gap-3">

  {/* Logo */}
  <h1 className="text-2xl font-black text-gray-800 tracking-tight cursor-pointer">
    Todo<span className="text-indigo-600">App</span>
  </h1>

  {/* Right Section */}
  <div className="flex items-center gap-3 w-full sm:w-auto">

    {/* Search */}
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-lg pl-4 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors bg-gray-50/50"
      />
    </div>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition duration-200 shadow-sm hover:shadow"
    >
      Logout
    </button>

  </div>
</nav>
  );
};

export default Navbar;