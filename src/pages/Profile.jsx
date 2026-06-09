import React, { useEffect, useState } from "react";

const API_BASE = "https://idea-forge-backend-ayp1.onrender.com";

function Profile() {
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    fetch(`${API_BASE}/api/collaborations/user/${user.name}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRequests(data);
        }
      })
      .catch(() => setRequests([]));
  }, [user]);

  return (
    <div className="container">
      <h2 style={{ marginBottom: "25px" }}>👤 Profile</h2>

      {user && (
        <div style={card}>
          <p>
            <b>Name:</b> {user.name}
          </p>

          <p>
            <b>Email:</b> {user.email}
          </p>

          <p>
            <b>Skills:</b> {user.skills || "Not provided"}
          </p>

          <p>
            <b>Reputation:</b> {user.reputation ?? 0}
          </p>
        </div>
      )}

      <h3 style={{ marginTop: "30px" }}>Collaboration Requests</h3>

      {requests.length === 0 && (
        <p style={{ color: "#777" }}>No collaboration requests</p>
      )}

      {requests.map((r, index) => (
        <div key={index} style={card}>
          <p>
            <b>{r.requesterName}</b> requested collaboration
          </p>

          <p style={{ color: "#666" }}>{r.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "15px",
  border: "1px solid #e5e7eb",
};