import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseApi, baseFileApi, ErrorResponse } from "../baseApi";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export interface FileInfo {
  fileUri: string;
  mimeType: string;
}

export const useUploadNotes = (knowledgeBaseId: number) => {
  const client = useQueryClient();

  const uploadNotes = ({ data }: { data: FileInfo[] }) => {
    return baseApi
      .post(`/notes/${knowledgeBaseId}`, { notes: data })
      .then((res) => res.data);
  };

  return useMutation({
    mutationFn: uploadNotes,
    onMutate: () => {
      toast.loading("Getting notes...", {
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
