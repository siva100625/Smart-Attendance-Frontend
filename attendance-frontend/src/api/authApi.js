import axios from "./axiosConfig";

export const login = (email, password) =>
  axios.post("/api/auth/login", { email, password });
