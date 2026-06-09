import API from "./api";

export const getStats = async () => {
  const res = await API.get("/dashboard/stats");
  return res.data;
};

export const getCategoryStats = async () => {
  const res = await API.get("/dashboard/categories");
  return res.data;
};
