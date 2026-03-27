import React from "react";

const Navbar = () => {
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
          className="border  rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-black"
        />

        {/* Logout Button */}
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;