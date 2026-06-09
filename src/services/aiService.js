import axios from "axios";

const API = "https://idea-forge-backend-ayp1.onrender.com/api/ai";

export const analyzeIdea = (text) =>
  axios.post(`${API}/analyze`, { idea: text });