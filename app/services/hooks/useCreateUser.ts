import { baseApi, ErrorResponse } from "../baseApi";
import { CreateUserModel } from "@/types/user";
import { AxiosError, AxiosResponse } from "axios";
import { ActionResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

export const createUser = (request: Omit<CreateUserModel, "confirmPassword">) =>
  baseApi.post<CreateUserModel, AxiosResponse<ActionResponse>>(
    "/users",
    request
  );

export const useCreateUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Redirecting to login page");
      setTimeout(() => {
        navigate({
          to: "/login",
        });
      }, 2000);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || "Error creating user");
    },
    onMutate: () => {
      toast.loading("Creating user...", {
        id: "create-user-toast",
      });
    },
    onSettled: () => {
      toast.dismiss("create-user-toast");
    },
  });
};
