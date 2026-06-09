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
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>Activity Feed</h2>

      {activities.length === 0 && (
        <p style={{ color: "#777" }}>No activity yet</p>
      )}

      {activities.map((a) => {
        const targetText =
          a.target && a.target !== "null" ? a.target : "an idea";

        return (
          <div key={a.id} className="card">
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {/* Avatar */}
              <div style={avatar}>{a.username?.charAt(0).toUpperCase()}</div>

              {/* Activity Text */}
              <div>
                <p style={{ margin: 0 }}>
                  <b>{a.username}</b> {a.action} <b>{targetText}</b>
                </p>

                <small style={{ color: "#888" }}>
                  {a.createdAt ? new Date(a.createdAt).toLocaleString() : ""}
                </small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityFeed;

/* Avatar Style */

const avatar = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#6366f1",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
};
