import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseApi, ErrorResponse } from "../baseApi";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { ActionResponse } from "@/types/base";
import { useNavigate } from "@tanstack/react-router";
import { CreateQuestionAnswerModel } from "@/types/questionAnswer";

const createQuestionAnswer = (request: CreateQuestionAnswerModel) =>
  baseApi.post<CreateQuestionAnswerModel, AxiosResponse<ActionResponse>>(
    "/question-answers",
    request
  );

export const useCreateQuestionAnswer = () => {
  const navigate = useNavigate();
  const client = useQueryClient();

  return useMutation({
    mutationFn: createQuestionAnswer,
    onMutate: () => {
      toast.loading("Creating question...", {
        id: "create-question-toast",
      });
    },
    onSettled: () => {
      toast.dismiss("create-question-toast");
    },
    onSuccess: (data) => {
      toast.success("Question created successfully");
      client.refetchQueries({
        queryKey: ["question-answers", { limit: 8 }],
      });

      setTimeout(() => {
        navigate({
          to: `/question-answers/${data.data.id}`,
        });
      }, 2000);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data.message || "Error creating question"
      );
    },
  });
};
