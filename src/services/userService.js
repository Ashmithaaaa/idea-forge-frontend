import axios from "axios";

const API = "https://idea-forge-backend-ayp1.onrender.com/api/notifications";

export const getNotifications = async (username) => {
  const res = await fetch(`${API}/${username}`);

  return res.json();
};