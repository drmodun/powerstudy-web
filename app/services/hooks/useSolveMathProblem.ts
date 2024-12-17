import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseApi, baseFileApi, ErrorResponse } from "../baseApi";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { ActionResponse } from "@/types/base";
import { useNavigate } from "@tanstack/react-router";

const solveMathProblem = async (data: File) => {
  const formData = new FormData();
  formData.append("file", data);
  console.log(formData, data);

  return baseFileApi
    .post<FormData, AxiosResponse<ActionResponse>>(`/math-problems`, formData)
    .then((res) => res.data);
};

export const useSolveMathProblem = () => {
  const client = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: solveMathProblem,
    onMutate: () => {
      toast.loading("Solving math problem...", {
        id: "solve-math-problem-toast",
      });
    },
    onSettled: () => {
      toast.dismiss("solve-math-problem-toast");
    },
    onSuccess: (data) => {
      toast.success("Math problem solved successfully");
      client.refetchQueries({
        queryKey: ["math-problems", { limit: 8 }],
      });

      setTimeout(() => {
        navigate({
          to: `/math-problems/${data.id}`,
        });
      }, 2000);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || "Error solving math problem");
    },
  });
};
