import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "https://idea-forge-backend.onrender.com";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

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
    <div
      className="fade-in"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "40px 30px",
          textAlign: "center",
        }}
      >
        <h2
          className="page-title"
          style={{ fontSize: "28px", marginBottom: "32px" }}
        >
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="primary-btn"
            style={{ width: "100%", marginTop: "16px", padding: "14px" }}
          >
            Login
          </button>
        </form>

        <p
          style={{
            marginTop: "24px",
            color: "var(--text-secondary)",
            fontSize: "14px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "var(--accent-primary)",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
