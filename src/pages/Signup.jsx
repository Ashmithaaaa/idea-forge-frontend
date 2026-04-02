import React, { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await signup(user);

    if (res.success === false) {
      alert(res.message);
      return;
    }

    alert("Signup successful");

    navigate("/login");
  };

  return (
    <div className="fade-in" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <div className="card" style={{ width: "100%", maxWidth: "450px", padding: "40px 30px", textAlign: "center" }}>
        <h2 className="page-title" style={{ fontSize: "28px", marginBottom: "32px" }}>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            className="input"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="skills"
            placeholder="Skills (e.g., React, Java, Marketing)"
            onChange={handleChange}
          />

          <button className="primary-btn" style={{ width: "100%", marginTop: "16px", padding: "14px" }}>Sign Up</button>
        </form>

        <p style={{ marginTop: "24px", color: "var(--text-secondary)", fontSize: "14px" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--accent-primary)", fontWeight: "600", textDecoration: "none" }}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
