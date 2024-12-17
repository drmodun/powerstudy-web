import { KnowledgeBaseWithUser } from "@/types/knowledgeBase";
import { queryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { findOneSchema, serverApi } from "./base";
import { createServerFn } from "@tanstack/start";
import { baseApi } from "@/services/baseApi";

export const fetchKnowledgeBase = createServerFn({ method: "GET" })
  .validator((id: number) => findOneSchema.parse({ id }))
  .handler(async ({ data }) => {
    try {
      console.log(data);
      const response: AxiosResponse<KnowledgeBaseWithUser> = await baseApi.get(
        `/knowledge-bases/with-user/${data.id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching knowledge base:", error);
      throw error; // Re-throw the error to properly handle it in the query
    }
  });

export const knowledgeBaseQueryOptions = (id: number) =>
  queryOptions({
    staleTime: 1000 * 60 * 5,
    queryKey: ["knowledgeBase", id],
    queryFn: () => fetchKnowledgeBase({ data: id }),
  });
