import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAuthToken } from "../baseApi";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

const logout = () => {
  return Promise.resolve(removeAuthToken());
};

export const useLogout = () => {
  const navigate = useNavigate();

  const { invalidateQueries } = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      invalidateQueries({ queryKey: ["me"] });
      removeAuthToken();
      toast.success("Logged out successfully");
      navigate({ to: "/login" });
    },
  });

  return logout;
};
