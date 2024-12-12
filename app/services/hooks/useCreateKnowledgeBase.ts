import { baseApi, ErrorResponse } from "../baseApi";
import { AxiosError, AxiosResponse } from "axios";
import { ActionResponse } from "@/types/base";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { z } from "vinxi";
import { CreateKnowledgeBaseModel } from "@/types/knowledgeBase";

export const createKnowledgeBase = (request: CreateKnowledgeBaseModel) =>
  baseApi.post<CreateKnowledgeBaseModel, AxiosResponse<ActionResponse>>(
    "/knowledge-bases",
    request
  );

export const useCreateKnowledgeBase = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createKnowledgeBase,
    onSuccess: (data: AxiosResponse<ActionResponse>) => {
      toast.success("Knowledge base created successfully");
      setTimeout(() => {
        navigate({
          to: `/knowledge-bases/${data.data.id}`,
        });
      }, 2000);
    },
    onMutate: () => {
      toast.loading("Creating knowledge base...", {
        id: "create-knowledge-base-toast",
      });
    },
    onSettled: () => {
      toast.dismiss("create-knowledge-base-toast");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data.message || "Error creating knowledge base"
      );
    },
  });
};
