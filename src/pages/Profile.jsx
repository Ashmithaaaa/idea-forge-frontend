import React, { useEffect, useState } from "react";

function Profile() {
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:8080/api/collaborations/user/${user.name}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRequests(data);
        }
      })
      .catch(() => setRequests([]));
  }, []);

  return (
    <div className="container fade-in">
      <h2 className="page-title" style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div className="avatar" style={{ width: "48px", height: "48px", fontSize: "24px" }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        My Profile
      </h2>

      {user && (
        <div className="card" style={{ maxWidth: "600px", marginBottom: "40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "16px", rowGap: "24px" }}>
            <b style={{ color: "var(--text-secondary)" }}>Name:</b>
            <span>{user.name}</span>

            <b style={{ color: "var(--text-secondary)" }}>Email:</b>
            <span>{user.email}</span>

            <b style={{ color: "var(--text-secondary)" }}>Skills:</b>
            <span style={{ color: "var(--accent-primary)", fontWeight: "500" }}>{user.skills || "Not provided"}</span>

            <b style={{ color: "var(--text-secondary)" }}>Reputation:</b>
            <span className="tag" style={{ width: "fit-content", margin: "0" }}>⭐ {user.reputation ?? 0} RP</span>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: "40px", marginBottom: "20px" }}>Collaboration Requests</h3>

      {requests.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "var(--text-secondary)" }}>No collaboration requests</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {requests.map((r, index) => (
          <div key={index} className="card" style={{ marginBottom: "0" }}>
            <p style={{ fontSize: "16px", marginBottom: "8px" }}>
              <b style={{ color: "var(--text-primary)" }}>{r.requesterName}</b> requested collaboration
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}>"{r.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
