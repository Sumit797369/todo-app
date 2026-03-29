// import React, { useState } from "react";
// import Login from "../components/Login";
// import Signup from "../components/Signup";

// const Home = ({ isLogin, setIsLogin }) => {

  

//   return (
//     <div className="min-h-screen flex">

//       {/* Left Section */}
//       <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-10">
//         <h1 className="text-5xl font-bold mb-4">Welcome to Todo App</h1>
//       </div>

//       {/* Right Section */}
//        <div className="w-1/2 flex justify-center items-center bg-gray-100">

//         {isLogin ? (<Login setIsLogin={setIsLogin} />) : (<Signup setIsLogin={setIsLogin} />  )}

//       </div>


//     </div>
//   );
// };

// export default Home;

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">

      {/* Left Section */}
      <div className="w-full bg-black text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to Todo App</h1>

        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => navigate("/login")}
            className="bg-white text-black px-6 py-2 rounded"
          >
            Login
          </button>

          <button 
            onClick={() => navigate("/signup")}
            className="bg-gray-300 text-black px-6 py-2 rounded"
          >
            Signup
          </button>
        </div>
      </div>

      {/* Right Section */}
      {/* <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <p>Select Login or Signup</p>
      </div> */}

    </div>
  );
};

export default Home;