import axios from "axios";

export const baseApiUrl =
  import.meta.env.VITE_BASE_API_URL || "http://localhost:5500";

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

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
