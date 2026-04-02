import axios from "axios";

const API = "https://idea-forge-backend.onrender.com/api/ai";

export const analyzeIdea = (text) =>
  axios.post(`${API}/analyze`, { idea: text });
