import axios from "axios";
import { toast } from "react-hot-toast";

export const baseApiUrl = process.env.BASE_API_URL || "http://localhost:5500";

export const baseApi = axios.create({
  baseURL: baseApiUrl,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseFileApi = axios.create({
  baseURL: baseApiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  }, // would rather divide these two
});

baseApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); //TODO: cant be bothered with cookies for this experiment, maybe later

baseFileApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

baseApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    toast.error(
      error.response.data.message || error.message || "Something went wrong"
    );
    return Promise.reject(error);
  }
); // TODO: might remove later
