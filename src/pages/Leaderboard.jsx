import React, { useEffect, useState } from "react";

const BASE_URL = "https://idea-forge-backend.onrender.com";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/leaderboard`);

      if (!res.ok) {
        console.error("API Error:", res.status);
        setUsers([]);
        return;
      }

      const data = await res.json();

      // ✅ ensure array
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load leaderboard", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      <h2 className="page-title" style={{ marginBottom: "32px" }}>
        🏆 Top Innovators
      </h2>

      {/* ✅ Loading */}
      {loading && (
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading...</p>
        </div>
      )}

      {/* ✅ Empty */}
      {!loading && (!Array.isArray(users) || users.length === 0) && (
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "var(--text-secondary)" }}>No users available</p>
        </div>
      )}

      {/* ✅ SAFE MAP */}
      {Array.isArray(users) && users.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {users.map((user, index) => (
            <div
              key={user?.id || index}
              className="card"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <div
                  className="avatar"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                        : index === 1
                          ? "linear-gradient(135deg, #9ca3af, #6b7280)"
                          : index === 2
                            ? "linear-gradient(135deg, #d97706, #b45309)"
                            : "var(--bg-secondary)",
                    color: index < 3 ? "white" : "var(--text-secondary)",
                  }}
                >
                  #{index + 1}
                </div>

                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                    {user?.name || "Unknown"}
                  </h3>
                  <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                    Skills: {user?.skills || "N/A"}
                  </p>
                </div>
              </div>

              <div className="tag">⭐ {user?.reputation ?? 0} RP</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
