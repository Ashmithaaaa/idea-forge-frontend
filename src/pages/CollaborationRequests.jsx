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
    <div className="container fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 className="page-title" style={{ margin: 0 }}>Collaborations</h2>
          <p className="page-subtitle" style={{ margin: "8px 0 0 0" }}>Manage your team and collaboration requests</p>
        </div>

        <div className="tag" style={{ border: "1px solid rgba(99, 102, 241, 0.4)", borderRadius: "8px", fontSize: "14px", padding: "8px 16px" }}>
          🔔 {pendingCount} pending
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "32px", overflowX: "auto", paddingBottom: "8px" }}>
        <button
          className={activeTab === "requests" ? "primary-btn" : "secondary-btn"}
          onClick={() => setActiveTab("requests")}
          style={{ padding: "8px 16px", borderRadius: "20px" }}
        >
          Requests ({pendingCount})
        </button>

        <button
          className={activeTab === "team" ? "primary-btn" : "secondary-btn"}
          onClick={() => setActiveTab("team")}
          style={{ padding: "8px 16px", borderRadius: "20px" }}
        >
          Team ({teamMembers.length})
        </button>

        <button
          className={activeTab === "activity" ? "primary-btn" : "secondary-btn"}
          onClick={() => setActiveTab("activity")}
          style={{ padding: "8px 16px", borderRadius: "20px" }}
        >
          Activity
        </button>
      </div>

      {activeTab === "requests" && (
        <div className="fade-in">
          {pendingCount === 0 && (
            <div className="card" style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ color: "var(--text-secondary)" }}>No pending collaboration requests.</p>
            </div>
          )}

          {requests
            .filter((r) => r.status === "PENDING")
            .map((r) => (
              <div key={r.id} className="card" style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
                <div className="avatar">
                  {r.requesterName?.charAt(0).toUpperCase()}
                </div>

                <div style={{ flex: "1 1 300px" }}>
                  <h3 style={{ marginBottom: "8px", fontSize: "18px" }}>{r.requesterName}</h3>

                  <p className="tag">{r.requesterSkills || "Developer"}</p>

                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}>Idea ID: {r.ideaId}</p>

                  <p style={{ color: "var(--text-primary)", lineHeight: "1.5" }}>"{r.message}"</p>
                </div>

                <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "200px" }}>
                  <button className="primary-btn" style={{ flex: 1, padding: "8px" }} onClick={() => accept(r.id)}>
                    Accept
                  </button>

                  <button className="secondary-btn" style={{ flex: 1, padding: "8px", borderColor: "rgba(239, 68, 68, 0.4)", color: "#ef4444" }} onClick={() => reject(r.id)}>
                    Decline
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {activeTab === "team" && (
        <div className="fade-in">
          {teamMembers.length === 0 && (
            <div className="card" style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ color: "var(--text-secondary)" }}>No team members yet.</p>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {teamMembers.map((member) => (
              <div key={member.id} className="card" style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "0" }}>
                <div className="avatar">
                  {member.requesterName?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 style={{ marginBottom: "8px", fontSize: "18px" }}>{member.requesterName}</h3>
                  <p className="tag">{member.requesterSkills}</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "8px" }}>Joined idea #{member.ideaId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="fade-in">
          {activities.length === 0 && (
            <div className="card" style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ color: "var(--text-secondary)" }}>No activity yet.</p>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {activities.map((a) => (
              <div key={a.id} className="card" style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "0" }}>
                <div className="avatar">{a.username?.charAt(0).toUpperCase()}</div>

                <div>
                  <p style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
                    <b style={{ color: "var(--text-primary)" }}>{a.username}</b> <span style={{ color: "var(--text-secondary)" }}>{a.action}</span> <b style={{ color: "var(--accent-primary)" }}>{a.target}</b>
                  </p>

                  <small style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                    {a.createdAt ? new Date(a.createdAt).toLocaleString() : ""}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationRequests;
