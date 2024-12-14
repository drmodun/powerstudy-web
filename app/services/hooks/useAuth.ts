import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { baseApi } from "../baseApi";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

export const fetchMe = () =>
  baseApi.get<User>("/auth/me").then((res) => res.data);

export const useAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
};
