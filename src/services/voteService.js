import api from "./api";

export const upvoteIdea = async (ideaId) => {
  const res = await api.post(`/votes/${ideaId}/upvote`);

  return res.data;
};

export const downvoteIdea = async (ideaId) => {
  const res = await api.post(`/votes/${ideaId}/downvote`);

  return res.data;
};
