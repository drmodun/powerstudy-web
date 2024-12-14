import axios from "axios";
import { z } from "zod";

export const serverApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:5500",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const findOneSchema = z.object({
  id: z.number(),
});
