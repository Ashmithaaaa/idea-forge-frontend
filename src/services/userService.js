import axios from "axios";

const API = "http://localhost:8080/api/notifications";

export const getNotifications = async (username) => {
  const res = await fetch(`${API}/${username}`);

  return res.json();
};
