import React, { useEffect, useState } from "react";

const BASE_URL = "https://idea-forge-backend.onrender.com";

function Profile() {
  const [requests, setRequests] = useState([]);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) return;

    fetch(`${BASE_URL}/api/collaborations/user/${user.name}`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ FIX
        setRequests(Array.isArray(data) ? data : []);
      })
      .catch(() => setRequests([]));
  }, []);

  return (
    <div className="container fade-in">
      <h2
        className="page-title"
        style={{
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div className="avatar">{user?.name?.charAt(0)?.toUpperCase()}</div>
        My Profile
      </h2>

      {user && (
        <div className="card">
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Skills: {user?.skills || "Not provided"}</p>
          <p>⭐ {user?.reputation ?? 0} RP</p>
        </div>
      )}

      <h3>Collaboration Requests</h3>

      {/* ✅ SAFE EMPTY CHECK */}
      {!Array.isArray(requests) || requests.length === 0 ? (
        <p>No collaboration requests</p>
      ) : (
        <div>
          {requests.map((r, index) => (
            <div key={index} className="card">
              <p>
                <b>{r?.requesterName}</b> requested collaboration
              </p>
              <p>"{r?.message || ""}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
