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

      // ✅ FIX
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error loading requests", error);
      setRequests([]);
    }
  };

  const loadActivities = async () => {
    try {
      const res = await api.get("/activity");

      // ✅ FIX
      setActivities(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error loading activity", error);
      setActivities([]);
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

  const pendingCount = Array.isArray(requests)
    ? requests.filter((r) => r.status === "PENDING").length
    : 0;

  const teamMembers = Array.isArray(requests)
    ? requests.filter((r) => r.status === "ACCEPTED")
    : [];

  return (
    <div className="container fade-in">
      <h2 className="page-title">Collaborations</h2>

      {/* REQUESTS TAB */}
      {activeTab === "requests" && (
        <div>
          {pendingCount === 0 ? (
            <p>No pending requests</p>
          ) : (
            Array.isArray(requests) &&
            requests
              .filter((r) => r.status === "PENDING")
              .map((r) => (
                <div key={r.id}>
                  <p>{r.requesterName}</p>
                  <button onClick={() => accept(r.id)}>Accept</button>
                  <button onClick={() => reject(r.id)}>Reject</button>
                </div>
              ))
          )}
        </div>
      )}

      {/* TEAM TAB */}
      {activeTab === "team" && (
        <div>
          {teamMembers.length === 0 ? (
            <p>No team members</p>
          ) : (
            teamMembers.map((m) => <p key={m.id}>{m.requesterName}</p>)
          )}
        </div>
      )}

      {/* ACTIVITY TAB */}
      {activeTab === "activity" && (
        <div>
          {!Array.isArray(activities) || activities.length === 0 ? (
            <p>No activity</p>
          ) : (
            activities.map((a) => <p key={a.id}>{a.username}</p>)
          )}
        </div>
      )}
    </div>
  );
};

export default CollaborationRequests;
