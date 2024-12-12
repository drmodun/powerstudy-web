import { baseApi, ErrorResponse } from "../baseApi";
import { LoginModel } from "@/types/user";
import { AxiosError, AxiosResponse } from "axios";
import { ActionResponse, LoginResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { redirect, useNavigate } from "@tanstack/react-router";

export const loginUser = (request: LoginModel) =>
  baseApi.post<LoginModel, AxiosResponse<LoginResponse>>(
    "/auth/login",
    request
  );

export const useLoginUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: AxiosResponse<LoginResponse>) => {
      console.log(data, data.data);
      localStorage.setItem("access_token", data.data.access_token);
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
