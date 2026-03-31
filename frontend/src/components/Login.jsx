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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full border p-3 mb-4 rounded-lg"
          value={login.email}
          onChange={handleChange}
        />

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter password"
          className="w-full border p-3 mb-4 rounded-lg"
          value={login.password}
          onChange={handleChange}
        />
       
        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?
          <span
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
