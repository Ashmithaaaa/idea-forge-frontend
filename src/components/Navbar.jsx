import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on login/signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.name;

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div style={navbar} className="navbar">
      {/* Logo */}
      <div style={logo}>🚀 IdeaForge</div>

      {/* Navigation Links */}
      <div style={links}>
        <Link style={linkStyle} to="/">
          Home
        </Link>

        <Link style={linkStyle} to="/explore">
          Explore
        </Link>

        {username && (
          <>
            <Link style={linkStyle} to="/submit">
              Submit Idea
            </Link>

            <Link style={linkStyle} to="/dashboard">
              Dashboard
            </Link>

            <Link style={linkStyle} to="/activity">
              Activity
            </Link>

            <Link style={linkStyle} to="/leaderboard">
              Leaderboard
            </Link>

            <Link style={linkStyle} to="/notifications">
              🔔 Notifications
            </Link>

            <Link style={linkStyle} to="/collaborations">
              Collaborations
            </Link>

            <Link style={linkStyle} to="/analyze">
              Analyze Idea
            </Link>

            <Link style={linkStyle} to="/profile">
              Profile
            </Link>
          </>
        )}
      </div>

      {/* Right Side */}
      <div style={userSection}>
        {!username ? (
          <>
            <Link style={loginBtn} to="/login">
              Login
            </Link>

            <Link style={signupBtn} to="/signup">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: "10px" }}>👤 {username}</span>

            <button style={logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

/* ---------- Styles ---------- */

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 30px",
  background: "#0f2748",
  color: "white",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logo = {
  fontWeight: "bold",
  fontSize: "20px",
};

const links = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

const userSection = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const loginBtn = {
  color: "white",
  textDecoration: "none",
  padding: "6px 12px",
};

const signupBtn = {
  background: "#2563eb",
  color: "white",
  padding: "6px 12px",
  borderRadius: "6px",
  textDecoration: "none",
};

const logoutBtn = {
  background: "#ef4444",
  border: "none",
  padding: "6px 12px",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};
