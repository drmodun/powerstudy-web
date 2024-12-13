import { KnowledgeBase } from "@/types/knowledgeBase";
import { queryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { serverApi } from "./base";
import { createServerFn } from "@tanstack/start";

export const fetchKnowledgeBase = createServerFn({ method: "GET" })
  .validator((id: number) => +id)
  .handler(async ({ data: id }) => {
    console.log(id);
    try {
      const response: AxiosResponse<KnowledgeBase> = await serverApi.get(
        `/knowledge-bases/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching knowledge base:", error);
    }
  });

export const knowledgeBaseQueryOptions = (id: number) =>
  queryOptions({
    staleTime: 1000 * 60 * 5,
    queryKey: ["knowledgeBase", id],
    queryFn: () => fetchKnowledgeBase({ data: id }),
  });
