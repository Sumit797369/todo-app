import React, { useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = ({ setIsLogin }) => {
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = signup;

    if (!email || !username || !password) {
      toast.error("All Fields are required");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 8+ chars, include uppercase, lowercase, number & special character",
      );
      return;
    }
    try {
      const url = "https://todo-app-1-k0d4.onrender.com/api/auth/register";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      });
      const result = await res.json();
      console.log(result);

      toast.success("Signup is successful");
      setIsLogin(true);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
  <form
    onSubmit={handleSubmit}
    className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8 w-96"
  >
    {/* Heading */}
    <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
      Create Account ✨
    </h2>
    <p className="text-sm text-gray-500 text-center mb-6">
      Signup to get started
    </p>

    {/* Username */}
    <div className="mb-4">
      <label className="text-sm text-gray-600">Username</label>
      <input
        type="text"
        name="username"
        placeholder="Enter your name"
        className="w-full mt-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
        value={signup.username}
        onChange={handleChange}
      />
    </div>

    {/* Email */}
    <div className="mb-4">
      <label className="text-sm text-gray-600">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="w-full mt-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
        value={signup.email}
        onChange={handleChange}
      />
    </div>

    {/* Password */}
    <div className="mb-4 relative">
      <label className="text-sm text-gray-600">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        className="w-full mt-1 border border-gray-300 p-3 pr-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
        value={signup.password}
        onChange={handleChange}
      />

      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-[38px] cursor-pointer text-sm text-gray-500 hover:text-black"
      >
        {showPassword ? "Hide" : "Show"}
      </span>
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900 transition duration-200 shadow-md hover:shadow-lg"
    >
      Create Account
    </button>

    {/* Footer */}
    <p className="text-sm text-center mt-5 text-gray-600">
      Already have an account?
      <span
        onClick={() => navigate("/login")}
        className="ml-1 text-black font-medium cursor-pointer hover:underline"
      >
        Login
      </span>
    </p>
  </form>
</div>
  );
};

export default Signup;
