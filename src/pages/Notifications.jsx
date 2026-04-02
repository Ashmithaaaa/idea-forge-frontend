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

      // ✅ FIX
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load notifications", error);
      setNotifications([]);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/read/${id}`);

      setNotifications((prev) =>
        Array.isArray(prev)
          ? prev.map((n) => (n.id === id ? { ...n, readStatus: true } : n))
          : [],
      );
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);

      setNotifications((prev) =>
        Array.isArray(prev) ? prev.filter((n) => n.id !== id) : [],
      );
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  return (
    <div className="container fade-in">
      <h2 className="page-title">🔔 Notifications</h2>

      {/* ✅ Empty state */}
      {!Array.isArray(notifications) || notifications.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <p>No notifications available</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {notifications.map((n) => (
            <div key={n?.id} className="card">
              <p>{n?.message || ""}</p>

              <div style={{ display: "flex", gap: "12px" }}>
                {!n?.readStatus && (
                  <button onClick={() => markAsRead(n.id)}>Mark Read</button>
                )}

                <button onClick={() => deleteNotification(n.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
