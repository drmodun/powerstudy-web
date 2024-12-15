import { useQuery } from "@tanstack/react-query";
import { baseApi, getAuthToken } from "../baseApi";
import { User } from "@/types/user";

export const fetchMe = () =>
  baseApi.get<User>("/auth/me").then((res) => res.data);

export const useAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: Infinity,
    enabled: getAuthToken() != null,
  });
};
