import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = "https://idea-forge-backend.onrender.com";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("Sending:", form); // ✅ debug

    try {
      const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {}

      console.log("Response:", res.status, data); // ✅ debug

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong");
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
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="skills"
            placeholder="Skills"
            onChange={handleChange}
            className="input"
          />

          <button
            className="primary-btn"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Sign Up
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
