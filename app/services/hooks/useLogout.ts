import { removeAuthToken } from "../baseApi";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeAuthToken();
    toast.success("Logged out successfully");
    navigate({ to: "/login" });
  };

  return logout;
};
