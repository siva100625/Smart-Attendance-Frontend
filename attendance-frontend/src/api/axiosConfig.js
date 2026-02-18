import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smart-attendance-backend-0ggj.onrender.com"
});
//http://localhost:8080
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
