import axios from "axios";
import { API_URL } from "../url";
import { useAuthStore } from "../stores/authStore";

const api = axios.create({
  baseURL: API_URL,
});

const auth = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null;

const token = auth ? auth.state.token : null;


api.interceptors.request.use(
    (config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
