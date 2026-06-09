import api from "./api";

/* GET ALL IDEAS */
export const getIdeas = async () => {
  const res = await api.get("/ideas");
  return res.data;
};

/* GET IDEA BY ID  ✅ REQUIRED */
export const getIdeaById = async (id) => {
  const res = await api.get(`/ideas/${id}`);
  return res.data;
};

/* CREATE IDEA */
export const createIdea = async (idea) => {
  const res = await api.post("/ideas", idea);
  return res.data;
};

/* TRENDING IDEAS */
export const getTrendingIdeas = async () => {
  const res = await api.get("/ideas/trending");
  return res.data;
};

/* SEARCH IDEAS */
export const searchIdeas = async (keyword) => {
  const res = await api.get(`/ideas/search?keyword=${keyword}`);
  return res.data;
};

/* FILTER IDEAS */
export const filterIdeas = async (category) => {
  const res = await api.get(`/ideas/category?category=${category}`);
  return res.data;
};

/* SIMILAR IDEAS */
export const getSimilarIdeas = async (id) => {
  const res = await api.get(`/ideas/similar/${id}`);
  return res.data;
};

/* MATCH USERS */
export const getMatchingUsers = async (ideaId) => {
  const res = await api.get(`/ideas/match/${ideaId}`);
  return res.data;
};
