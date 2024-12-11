import { baseApi, ErrorResponse } from "../baseApi";
import { LoginModel } from "@/types/user";
import { AxiosError, AxiosResponse } from "axios";
import { ActionResponse, LoginResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { redirect } from "@tanstack/react-router";

export const loginUser = (request: LoginModel) =>
  baseApi.post<LoginModel, AxiosResponse<LoginResponse>>(
    "/auth/login",
    request
  );

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: AxiosResponse<LoginResponse>) => {
      localStorage.setItem("access_token", data.data.accessToken);
      toast.success("Redirecting to home page");
      setTimeout(() => {
        window.location.href = "/"; // TODO: use router or something
      }, 2000);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || "Error logging in");
    },
  });
};
