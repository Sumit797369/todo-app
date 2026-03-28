import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsLogin,setSearch }) => {
   const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    // console.log(localStorage.getItem("token"));

    setIsLogin(false);
    navigate("/home");
  };
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-black">
        Todo-App
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-2 py-2 outline-none focus:ring-1 focus:ring-black"
        />

        {/* Logout Button */}
        <button
        onClick={handleLogout}
         className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;