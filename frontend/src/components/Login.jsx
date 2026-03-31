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
<div className="min-h-screen flex items-center justify-center bg-black">
  <form
    onSubmit={handleSubmit}
    className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] rounded-2xl p-8 w-96"
  >
    {/* Heading */}
    <h2 className="text-2xl font-bold text-center text-white mb-2">
      Welcome Back
    </h2>
    <p className="text-center text-white/60 text-sm mb-6">
      Login to continue
    </p>

    {/* Email */}
    <div className="mb-4">
      <label className="text-sm text-white/70">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={login.email}
        onChange={handleChange}
        className="w-full mt-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-md"
      />
    </div>

    {/* Password */}
    <div className="mb-4 relative">
      <label className="text-sm text-white/70">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        value={login.password}
        onChange={handleChange}
        className="w-full mt-1 p-3 pr-16 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-md"
      />

      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-[38px] cursor-pointer text-sm text-white/60 hover:text-white"
      >
        {showPassword ? "Hide" : "Show"}
      </span>
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full bg-white/90 text-black py-3 rounded-lg font-semibold hover:bg-white transition duration-200 backdrop-blur-md"
    >
      Login
    </button>

    {/* Footer */}
    <p className="text-sm text-center mt-5 text-white/60">
      Don’t have an account?
      <span
        onClick={() => navigate("/signup")}
        className="ml-1 text-white cursor-pointer hover:underline"
      >
        Sign up
      </span>
    </p>
  </form>
</div>
  );
};

export default Login;
