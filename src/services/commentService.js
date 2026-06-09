import api from "./api";

export const getComments = async (ideaId) => {
  const res = await api.get(`/comments/${ideaId}`);

  return res.data;
};

export const addComment = async (comment) => {
  const res = await api.post(`/comments`, comment);

  return res.data;
};
