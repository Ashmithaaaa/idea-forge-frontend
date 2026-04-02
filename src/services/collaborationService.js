import API from "./api";

export const sendCollaborationRequest = async (data) => {
  const res = await API.post("/collaborations", data);
  return res.data;
};

export const getRequestsByIdea = async (ideaId) => {
  const res = await API.get(`/collaborations/idea/${ideaId}`);
  return res.data;
};

export const getUserRequests = async (username) => {
  const res = await API.get(`/collaborations/user/${username}`);
  return res.data;
};

export const acceptRequest = async (id) => {
  const res = await API.put(`/collaborations/${id}/accept`);
  return res.data;
};

export const rejectRequest = async (id) => {
  const res = await API.put(`/collaborations/${id}/reject`);
  return res.data;
};
