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
    <div className="navbar fade-in">
      {/* Logo */}
      <div className="navbar-logo">🚀 IdeaForge</div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/explore">
          Explore
        </Link>

        {username && (
          <>
            <Link className="navbar-link" to="/submit">
              Submit Idea
            </Link>
            <Link className="navbar-link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="navbar-link" to="/activity">
              Activity
            </Link>
            <Link className="navbar-link" to="/leaderboard">
              Leaderboard
            </Link>
            <Link className="navbar-link" to="/notifications">
              🔔 Notifications
            </Link>
            <Link className="navbar-link" to="/collaborations">
              Collaborations
            </Link>
            <Link className="navbar-link" to="/analyze">
              Analyze Idea
            </Link>
            <Link className="navbar-link" to="/profile">
              Profile
            </Link>
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="navbar-user-section">
        {!username ? (
          <>
            <Link className="secondary-btn" style={{ padding: '8px 16px' }} to="/login">
              Login
            </Link>
            <Link className="primary-btn" style={{ padding: '8px 16px' }} to="/signup">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: "10px", fontWeight: "500", color: "var(--text-secondary)" }}>
              👤 {username}
            </span>
            <button className="secondary-btn" style={{ padding: '8px 16px', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' }} onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
