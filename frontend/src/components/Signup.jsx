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
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-xl shadow-md w-96"
  >
    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

    {/* Username */}
    <input
      type="text"
      name="username"
      placeholder="Enter name"
      className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      value={signup.username}
      onChange={handleChange}
    />

    {/* Email */}
    <input
      type="email"
      name="email"
      placeholder="Enter email"
      className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      value={signup.email}
      onChange={handleChange}
    />

    {/* Password */}
    <div className="relative mb-4">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter password"
        className="w-full border p-3 pr-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        value={signup.password}
        onChange={handleChange}
      />

      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-gray-600 hover:text-black"
      >
        {showPassword ? "Hide" : "Show"}
      </span>
    </div>

    {/* Button */}
    <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900 transition duration-200 shadow-md hover:shadow-lg">
      Create Account
    </button>

    {/* Footer */}
    <p className="text-sm text-center mt-4">
      Already have an account?
      <span
        onClick={() => navigate("/login")}
        className="text-blue-500 cursor-pointer ml-1 hover:underline"
      >
        Login
      </span>
    </p>
  </form>
</div>
  );
};

export default Signup;
