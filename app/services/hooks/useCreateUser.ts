import { baseApi, ErrorResponse } from "../baseApi";
import { CreateUserModel } from "@/types/user";
import { AxiosError, AxiosResponse } from "axios";
import { ActionResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const createUser = (request: Omit<CreateUserModel, "confirmPassword">) =>
  baseApi.post<CreateUserModel, AxiosResponse<ActionResponse>>(
    "/users",
    request
  );

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Redirecting to login page");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || "Error logging in");
    },
  });
};
