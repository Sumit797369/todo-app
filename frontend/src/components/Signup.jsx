import React, { useState } from "react";

const Signup = ({ setIsLogin }) => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();

    const userData = {
      name,
      email,
      password
    };

    console.log(userData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-96"
    >

      <h2 className="text-2xl font-bold mb-6 text-center">
        Sign Up
      </h2>

      <input
        type="text"
        placeholder="Enter name"
        className="w-full border p-3 mb-4 rounded-lg"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        className="w-full border p-3 mb-4 rounded-lg"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        className="w-full border p-3 mb-4 rounded-lg"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900"
      >
        Create Account
      </button>

      <p className="text-sm text-center mt-4">
  Already have an account? 
  <span
    onClick={() => setIsLogin(true)}
    className="text-gray-500 cursor-pointer ml-1"
  >
    Login
  </span>
</p>

    </form>
  );
};

export default Signup;