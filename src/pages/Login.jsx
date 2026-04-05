import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://idea-forge-backend.onrender.com";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login clicked"); // ✅ debug

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("Status:", res.status); // ✅ debug

      let data = {};
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login success");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="container">
      <h2>Welcome Back</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
