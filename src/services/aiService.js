import axios from "axios";

const API = "http://localhost:8080/api/ai";

export const analyzeIdea = (text) =>
  axios.post(`${API}/analyze`, { idea: text });
