import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Home = () => {

  const [isLogin,setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">

      {/* Left Section */}
      <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to Todo App</h1>
      </div>

      {/* Right Section */}
       <div className="w-1/2 flex justify-center items-center bg-gray-100">

        {isLogin ? (<Login setIsLogin={setIsLogin} />) : (<Signup setIsLogin={setIsLogin} />  )}

      </div>


    </div>
  );
};

export default Home;