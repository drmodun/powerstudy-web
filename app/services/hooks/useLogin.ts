import { baseApi, ErrorResponse, setAuthToken } from "../baseApi";
import { LoginModel } from "@/types/user";
import { AxiosError, AxiosResponse } from "axios";
import { ActionResponse, LoginResponse } from "@/types/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getRouterContext, useNavigate } from "@tanstack/react-router";
import { useAuth } from "./useAuth";
import { getContext, setCookie } from "vinxi/http";

export const loginUser = (request: LoginModel) =>
  baseApi.post<LoginModel, AxiosResponse<LoginResponse>>(
    "/auth/login",
    request
  );

export const useLoginUser = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async ({ data }: AxiosResponse<LoginResponse>) => {
      setAuthToken(data.access_token);

      await auth.refetch();
      toast.success("Redirecting to home page");
      setTimeout(() => {
        navigate({
          to: "/",
        });
      }, 2000);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || "Error logging in");
    },
    onMutate: () => {
      toast.loading("Logging in...", {
        id: "login-toast",
      });
    },
    onSettled: () => {
      toast.dismiss("login-toast");
    },
  });
};
