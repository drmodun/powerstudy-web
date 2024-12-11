import { baseApi } from "../baseApi";
import { CreateUserModel } from "@/types/user";
import { AxiosResponse } from "axios";
import { ActionResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const createUser = (request: CreateUserModel) =>
  baseApi.post<CreateUserModel, AxiosResponse<ActionResponse>>(
    "/users",
    request
  );

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Error creating user");
    },
  });
};
