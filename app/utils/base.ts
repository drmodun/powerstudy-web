import axios from "axios";

export const serverApi = axios.create({
  baseURL: process.env.VITE_BASE_API_URL || "http://localhost:5500",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
