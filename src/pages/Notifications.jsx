import React, { useEffect, useState } from "react";
import api from "../services/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.name;

  useEffect(() => {
    if (!username) return;

    loadNotifications();

    const interval = setInterval(loadNotifications, 5000);

    return () => clearInterval(interval);
  }, [username]);

  const loadNotifications = async () => {
    try {
      const res = await api.get(`/notifications/${username}`);
      setNotifications(res.data || []);
    } catch (error) {
      console.error("Failed to load notifications", error);
      setNotifications([]);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/read/${id}`);

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readStatus: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);

      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  return (
    <div className="container fade-in">
      <h2 className="page-title" style={{ marginBottom: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
        🔔 Notifications
      </h2>

      {notifications.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "var(--text-secondary)" }}>No notifications available</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px" }}>
        {notifications.map((n) => (
          <div key={n.id} className="card" style={{ 
            marginBottom: "0", 
            borderLeft: n.readStatus ? "none" : "4px solid var(--accent-primary)",
            background: n.readStatus ? "var(--bg-glass)" : "var(--bg-glass-hover)"
          }}>
            <p style={{ fontSize: "16px", margin: "0 0 16px 0", color: n.readStatus ? "var(--text-secondary)" : "var(--text-primary)" }}>{n.message}</p>

            <div style={{ display: "flex", gap: "12px" }}>
              {!n.readStatus && (
                <button className="primary-btn" style={{ padding: "8px 16px", fontSize: "13px" }} onClick={() => markAsRead(n.id)}>
                  Mark Read
                </button>
              )}

              <button className="secondary-btn" style={{ padding: "8px 16px", fontSize: "13px", borderColor: "rgba(239, 68, 68, 0.4)", color: "#ef4444" }} onClick={() => deleteNotification(n.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
