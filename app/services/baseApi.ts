import axios from "axios";
import Cookies from "js-cookie";

export const baseApiUrl =
  import.meta.env.VITE_BASE_API_URL || "http://localhost:5500";

const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: import.meta.env.PROD,
  sameSite: "strict" as const,
};

export const AUTH_TOKEN_KEY = "auth_token";

export interface JWTPayload {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

export const setAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN_KEY, token, COOKIE_OPTIONS);
};

export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_KEY);
};

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_KEY);
};

export const baseApi = axios.create({
  baseURL: baseApiUrl,
  timeout: 1000 * 60, // TODO: fix this with streaming
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseFileApi = axios.create({
  baseURL: baseApiUrl,
  timeout: 1000 * 60,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

baseApi.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

baseFileApi.interceptors.request.use((config) => {
  const token = getAuthToken();
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
