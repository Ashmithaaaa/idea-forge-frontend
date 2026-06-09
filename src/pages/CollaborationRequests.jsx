import React, { useEffect, useState } from "react";
import api from "../services/api";

const CollaborationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activeTab, setActiveTab] = useState("requests");

  useEffect(() => {
    loadRequests();
    loadActivities();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await api.get("/collaborations");
      setRequests(res.data || []);
    } catch (error) {
      console.error("Error loading requests", error);
    }
  };

  const loadActivities = async () => {
    try {
      const res = await api.get("/activity");
      setActivities(res.data || []);
    } catch (error) {
      console.error("Error loading activity", error);
    }
  };

  const accept = async (id) => {
    try {
      await api.put(`/collaborations/${id}/accept`);
      loadRequests();
    } catch (error) {
      console.error("Accept request error", error);
    }
  };

  const reject = async (id) => {
    try {
      await api.put(`/collaborations/${id}/reject`);
      loadRequests();
    } catch (error) {
      console.error("Reject request error", error);
    }
  };

  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const teamMembers = requests.filter((r) => r.status === "ACCEPTED");

  return (
    <div className="container">
      <div style={header}>
        <div>
          <h2 style={{ margin: 0 }}>Collaborations</h2>
          <p style={subtitle}>Manage your team and collaboration requests</p>
        </div>

        <div style={pendingBadge}>🔔 {pendingCount} pending</div>
      </div>

      <div style={tabs}>
        <button
          style={activeTab === "requests" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("requests")}
        >
          Requests ({pendingCount})
        </button>

        <button
          style={activeTab === "team" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("team")}
        >
          Team ({teamMembers.length})
        </button>

        <button
          style={activeTab === "activity" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
      </div>

      {activeTab === "requests" && (
        <div>
          {pendingCount === 0 && (
            <p style={{ color: "#777" }}>No collaboration requests</p>
          )}

          {requests
            .filter((r) => r.status === "PENDING")
            .map((r) => (
              <div key={r.id} style={card}>
                <div style={avatar}>
                  {r.requesterName?.charAt(0).toUpperCase()}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: "5px" }}>{r.requesterName}</h3>

                  <p style={tag}>{r.requesterSkills || "Developer"}</p>

                  <p style={ideaText}>Idea ID: {r.ideaId}</p>

                  <p style={{ color: "#666" }}>{r.message}</p>
                </div>

                <div style={buttons}>
                  <button style={acceptBtn} onClick={() => accept(r.id)}>
                    Accept
                  </button>

                  <button style={rejectBtn} onClick={() => reject(r.id)}>
                    Decline
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {activeTab === "team" && (
        <div>
          {teamMembers.length === 0 && (
            <p style={{ color: "#777" }}>No team members yet</p>
          )}

          {teamMembers.map((member) => (
            <div key={member.id} style={card}>
              <div style={avatar}>
                {member.requesterName?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 style={{ marginBottom: "5px" }}>{member.requesterName}</h3>
                <p style={tag}>{member.requesterSkills}</p>
                <p style={{ color: "#666" }}>Joined idea #{member.ideaId}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "activity" && (
        <div>
          {activities.length === 0 && (
            <p style={{ color: "#777" }}>No activity yet</p>
          )}

          {activities.map((a) => (
            <div key={a.id} style={card}>
              <div style={avatar}>{a.username?.charAt(0).toUpperCase()}</div>

              <div>
                <p style={{ margin: 0 }}>
                  <b>{a.username}</b> {a.action} <b>{a.target}</b>
                </p>

                <small style={{ color: "#888" }}>
                  {a.createdAt ? new Date(a.createdAt).toLocaleString() : ""}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollaborationRequests;

/* ---------- STYLES ---------- */

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
};

const subtitle = {
  color: "#666",
  marginTop: "5px",
};

const pendingBadge = {
  background: "#eef2ff",
  padding: "8px 14px",
  borderRadius: "20px",
  color: "#4f46e5",
  fontWeight: "500",
};

const tabs = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const tabStyle = {
  padding: "8px 16px",
  borderRadius: "20px",
  border: "1px solid #ddd",
  background: "#f3f4f6",
  color: "#374151",
  cursor: "pointer",
  fontWeight: "500",
};

const activeTabStyle = {
  ...tabStyle,
  background: "#4f46e5",
  color: "white",
  border: "none",
};

const card = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
  background: "white",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
};

const avatar = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  background: "#4f46e5",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
};

const tag = {
  display: "inline-block",
  background: "#eef2ff",
  color: "#4338ca",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "12px",
  marginBottom: "8px",
};

const ideaText = {
  fontSize: "13px",
  color: "#777",
};

const buttons = {
  display: "flex",
  gap: "10px",
};

const acceptBtn = {
  background: "#4f46e5",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const rejectBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};
