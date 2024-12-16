import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseFileApi, ErrorResponse } from "../baseApi";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useUploadNotes = (knowledgeBaseId: number) => {
  const client = useQueryClient();

  const uploadNotes = ({ data }: { data: File[] }) => {
    const formData = new FormData();
    data.forEach((file) => {
      formData.append("files", file);
    });
    return baseFileApi
      .post(`/notes/${knowledgeBaseId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };

  return useMutation({
    mutationFn: uploadNotes,
    onMutate: () => {
      toast.loading("Uploading notes...", {
        id: "upload-notes-toast",
      });
    },
    onSettled: () => {
      toast.dismiss("upload-notes-toast");
    },
    onSuccess: () => {
      toast.success("Notes uploaded successfully");
      client.refetchQueries({
        queryKey: ["notes", { knowledgeBaseId, limit: 8 }], // TODO: check if this works that way
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || "Error uploading notes");
    },
  });
};
