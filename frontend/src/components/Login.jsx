import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // setIsLogin(true);
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = login;

    if (!email || !password) {
      toast.error("All Fields are required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const url = "https://todo-app-1-k0d4.onrender.com/api/auth/login";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const result = await res.json();
      console.log(result);

      // backend response check
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Login is successful");

      localStorage.setItem("token", result.token);

      setIsLogin(true);

      // dashboard redirect
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="bg-white rounded-2xl shadow-xl p-8 w-96"
  >
    {/* Logo / Title */}
    <h2 className="text-2xl font-bold text-center text-gray-800">
      Welcome Back
    </h2>
    <p className="text-center text-gray-500 text-sm mb-6">
      Please login to continue
    </p>

    {/* Email */}
    <div className="mb-4">
      <label className="text-sm text-gray-600">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={login.email}
        onChange={handleChange}
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Password */}
    <div className="mb-2 relative">
      <label className="text-sm text-gray-600">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        value={login.password}
        onChange={handleChange}
        className="w-full mt-1 p-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-[38px] cursor-pointer text-sm text-gray-500 hover:text-black"
      >
        {showPassword ? "Hide" : "Show"}
      </span>
    </div>

    {/* Forgot password */}
    <div className="text-right mb-4">
      <span className="text-sm text-blue-500 cursor-pointer hover:underline">
        Forgot password?
      </span>
    </div>

    {/* Login Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
    >
      Login
    </button>

    {/* Divider */}
    <div className="flex items-center my-5">
      <hr className="flex-grow border-gray-300" />
      <span className="mx-2 text-gray-400 text-sm">OR</span>
      <hr className="flex-grow border-gray-300" />
    </div>

    {/* Social Login */}
    <div className="flex gap-3">
      <button
        type="button"
        className="w-full border py-2 rounded-lg hover:bg-gray-100 transition"
      >
        Google
      </button>
      <button
        type="button"
        className="w-full border py-2 rounded-lg hover:bg-gray-100 transition"
      >
        Facebook
      </button>
    </div>

    {/* Signup */}
    <p className="text-center text-sm text-gray-600 mt-6">
      Don’t have an account?
      <span
        onClick={() => navigate("/signup")}
        className="text-blue-600 cursor-pointer ml-1 hover:underline"
      >
        Sign up
      </span>
    </p>
  </form>
</div>
  );
};

export default Login;
