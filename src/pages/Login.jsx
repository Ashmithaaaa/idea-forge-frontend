import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = "https://idea-forge-backend-ayp1.onrender.com";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login error");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          <button style={loginBtn}>Login</button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f3f4f6",
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "10px",
  width: "350px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const loginBtn = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  border: "none",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};