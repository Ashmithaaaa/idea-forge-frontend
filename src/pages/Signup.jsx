import React, { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";

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
    <div style={page}>
      <div style={card}>
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            style={input}
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            style={input}
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            style={input}
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <input
            style={input}
            name="skills"
            placeholder="Skills"
            onChange={handleChange}
          />

          <button style={button}>Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

const page = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
};

const card = {
  width: "400px",
  padding: "30px",
  background: "white",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
};

const button = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
};
