import { baseApi } from "@/services/baseApi";
import { KnowledgeBase } from "@/types/knowledgeBase";
import { queryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { serverApi } from "./base";

export const fetchKnowledgeBase = async (id: string) => {
  console.info("fetching knowledge base", id);

  const knowledgeBase: AxiosResponse<KnowledgeBase> = await serverApi.get(
    `/knowledge-bases/${id}`
  );

  return knowledgeBase.data;
};

export const knowledgeBaseQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["knowledgeBase", id],
    staleTime: 5 * 60 * 1000,
    queryFn: () => fetchKnowledgeBase(id),
  });
