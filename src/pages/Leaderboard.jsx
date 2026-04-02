import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users/leaderboard");

      const data = await res.json();

      setUsers(data);
    } catch (error) {
      console.error("Failed to load leaderboard", error);
    }
  };

  return (
    <div className="container fade-in">
      <h2 className="page-title" style={{ marginBottom: "32px" }}>🏆 Top Innovators</h2>

      {users.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "var(--text-secondary)" }}>No users available</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px", margin: "0 auto" }}>
        {users.map((user, index) => (
          <div key={user.id} className="card" style={{ marginBottom: "0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div 
                className="avatar" 
                style={{ 
                  background: index === 0 ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : index === 1 ? "linear-gradient(135deg, #9ca3af, #6b7280)" : index === 2 ? "linear-gradient(135deg, #d97706, #b45309)" : "var(--bg-secondary)", 
                  color: index < 3 ? "white" : "var(--text-secondary)",
                  border: index >= 3 ? "1px solid var(--border-color)" : "none"
                }}
              >
                #{index + 1}
              </div>
              
              <div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                  {user.name}
                </h3>
                <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "14px" }}>Skills: <span style={{ color: "var(--text-primary)" }}>{user.skills}</span></p>
              </div>
            </div>

            <div className="tag" style={{ margin: 0 }}>
              ⭐ {user.reputation} RP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
