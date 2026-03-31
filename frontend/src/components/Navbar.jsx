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
  <h1 className="text-2xl font-bold text-black tracking-tight cursor-pointer">
    Todo<span className="text-gray-500">App</span>
  </h1>

  {/* Right Section */}
  <div className="flex items-center gap-3 w-full sm:w-auto">

    {/* Search */}
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-lg pl-3 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
      />
    </div>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition duration-200 shadow-sm hover:shadow-md active:scale-95"
    >
      Logout
    </button>

  </div>
</nav>
  );
};

export default Navbar;