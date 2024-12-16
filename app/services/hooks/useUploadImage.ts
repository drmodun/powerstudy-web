import { useMutation } from "@tanstack/react-query";
import { baseFileApi, ErrorResponse } from "../baseApi";
import toast from "react-hot-toast";
import { AxiosError, AxiosResponse } from "axios";
import { FileInfo } from "./useUploadNotes";

export const upload = (data: File[]) => {
  const formData = new FormData();
  data.forEach((file) => {
    formData.append("files", file);
  });
  return baseFileApi
    .post<FormData, AxiosResponse<FileInfo[]>>("/blob/images", formData)
    .then((res) => res.data);
};

export const useUploadImages = () => {
  return useMutation({
    mutationFn: upload,
    onMutate: () => {
      toast.loading("Uploading images...", {
        id: "upload-image-toast",
      });
    },
    onSettled: () => {
      toast.dismiss("upload-image-toast");
    },
    onSuccess: () => {
      toast.success("Images uploaded successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || "Error uploading image");
    },
  });
};
