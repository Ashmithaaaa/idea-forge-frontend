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
        prev.map((n) => (n.id === id ? { ...n, readStatus: true } : n)),
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
    <div className="container">
      <h2>🔔 Notifications</h2>

      {notifications.length === 0 && (
        <p style={{ color: "#777" }}>No notifications available</p>
      )}

      {notifications.map((n) => (
        <div key={n.id} style={card}>
          <p>{n.message}</p>

          <div style={{ marginTop: "10px" }}>
            {!n.readStatus && (
              <button style={btn} onClick={() => markAsRead(n.id)}>
                Mark Read
              </button>
            )}

            <button style={deleteBtn} onClick={() => deleteNotification(n.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;

const card = {
  background: "white",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "8px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
};

const btn = {
  marginRight: "10px",
  padding: "5px 10px",
  background: "#2563eb",
  border: "none",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  padding: "5px 10px",
  background: "#ef4444",
  border: "none",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};
