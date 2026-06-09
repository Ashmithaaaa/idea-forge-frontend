import React, { useEffect, useState } from "react";

const API_BASE = "https://idea-forge-backend-ayp1.onrender.com";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/users/leaderboard`);

      const data = await res.json();

      setUsers(data);
    } catch (error) {
      console.error("Failed to load leaderboard", error);
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "25px" }}>🏆 Top Innovators</h2>

      {users.length === 0 && (
        <p style={{ color: "#777" }}>No users available</p>
      )}

      {users.map((user, index) => (
        <div key={user.id} className="card">
          <h3>
            #{index + 1} {user.name}
          </h3>

          <p>Skills: {user.skills}</p>

          <div style={stats}>Reputation: {user.reputation}</div>
        </div>
      ))}
    </div>
  );
};

const stats = {
  marginTop: "10px",
  color: "#555",
};

export default Leaderboard;