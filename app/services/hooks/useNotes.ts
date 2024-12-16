import { Note } from "@/types/note";
import { baseApi } from "../baseApi";
import { z } from "zod";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const paramsSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  title: z.string().min(1).optional(),
  knowledgeBaseId: z.number().min(1).optional(),
});

// Add sorting options later

export const useNotes = (params: z.infer<typeof paramsSchema>) => {
  const fetchNotes = async ({ pageParam }: { pageParam: number }) => {
    const response = await baseApi.get<Note[]>("/notes", {
      params: { ...params, page: pageParam },
    });
    return response.data;
  };

  return useInfiniteQuery({
    queryKey: ["notes", params],
    queryFn: fetchNotes,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => 
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });
};
