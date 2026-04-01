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
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
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
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Username</label>
      <input
        type="text"
        name="username"
        placeholder="Enter your name"
        className="w-full mt-1 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors bg-gray-50/50"
        value={signup.username}
        onChange={handleChange}
      />
    </div>

    {/* Email */}
    <div className="mb-4">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="w-full mt-1 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors bg-gray-50/50"
        value={signup.email}
        onChange={handleChange}
      />
    </div>

    {/* Password */}
    <div className="mb-6 relative">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        className="w-full mt-1 border border-gray-200 p-3 pr-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors bg-gray-50/50"
        value={signup.password}
        onChange={handleChange}
      />

      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-[38px] cursor-pointer text-sm text-gray-400 hover:text-indigo-600 font-medium"
      >
        {showPassword ? "Hide" : "Show"}
      </span>
    </div>

    {/* Button */}
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center font-medium"
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      ) : "Create Account"}
    </button>

    {/* Footer */}
    <p className="text-sm text-center mt-5 text-gray-600">
      Already have an account?
      <span
        onClick={() => navigate("/login")}
        className="ml-1 text-indigo-600 font-medium cursor-pointer hover:underline"
      >
        Login
      </span>
    </p>
  </form>
</div>
  );
};

export default Signup;
