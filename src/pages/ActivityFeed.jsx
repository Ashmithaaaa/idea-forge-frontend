import React, { useEffect, useState } from "react";
import api from "../services/api";

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await api.get("/activity");
      setActivities(res.data);
    } catch (error) {
      console.error("Failed to load activities", error);
    }
  };

  return (
    <div className="container fade-in">
      <h2 className="page-title" style={{ marginBottom: "32px" }}>Activity Feed</h2>

      {activities.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "var(--text-secondary)" }}>No activity yet</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {activities.map((a) => {
          const targetText =
            a.target && a.target !== "null" ? a.target : "an idea";

          return (
            <div key={a.id} className="card" style={{ marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Avatar */}
                <div className="avatar">{a.username?.charAt(0).toUpperCase()}</div>

                {/* Activity Text */}
                <div>
                  <p style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
                    <b style={{ color: "var(--text-primary)" }}>{a.username}</b> <span style={{ color: "var(--text-secondary)" }}>{a.action}</span> <b style={{ color: "var(--accent-primary)" }}>{targetText}</b>
                  </p>

                  <small style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                    {a.createdAt ? new Date(a.createdAt).toLocaleString() : ""}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
