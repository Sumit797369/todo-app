import React, { useState } from "react";

const Login = ({ setIsLogin }) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(email,password);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-96"
    >

      <h2 className="text-2xl font-bold mb-6 text-center">
        Login
      </h2>

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
        Login
      </button>

      <p className="text-sm text-center mt-4">
  Don't have an account? 
  <span
    onClick={() => setIsLogin(false)}
    className="text-gray-500 cursor-pointer ml-1"
  >
    Sign Up
  </span>
</p>

    </form>
  );
};

export default Login;