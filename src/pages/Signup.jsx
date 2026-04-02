import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "https://idea-forge-backend.onrender.com";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // 🔥 MOST IMPORTANT FIX
        body: JSON.stringify({
          username: name, // ✅ backend expects username
          email: email,
          password: password,
          skills: skills,
        }),
      });

      // ✅ SAFE JSON PARSE
      let data = null;
      try {
        data = await res.json();
      } catch (err) {
        console.warn("No JSON response");
      }

      if (!res.ok) {
        alert(data?.message || "Signup failed");
        return;
      }

      alert("Signup successful ✅");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Signup error ❌");
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
      }}
    >
      <div
        className="card"
        style={{ maxWidth: "400px", width: "100%", padding: "30px" }}
      >
        <h2 className="page-title">Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            className="input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className="input"
            placeholder="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <button
            className="primary-btn"
            style={{ width: "100%", marginTop: "16px" }}
          >
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: "16px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
