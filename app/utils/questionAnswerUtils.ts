import { baseApi } from "@/services/baseApi";
import { createServerFn } from "@tanstack/start";
import { findOneSchema } from "./base";
import { queryOptions } from "@tanstack/react-query";
import { QuestionAnswer } from "@/types/questionAnswer";

export const fetchQuestionAnswer = createServerFn({ method: "GET" })
  .validator((id: number) => findOneSchema.parse({ id }))
  .handler(async ({ data }) => {
    try {
      const response = await baseApi.get<QuestionAnswer>(
        `/question-answers/${data.id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching question answer:", error);
      throw error;
    }
  });

export const questionAnswerQueryOptions = (id: number) =>
  queryOptions({
    staleTime: 1000 * 60 * 5,
    queryKey: ["questionAnswer", id],
    queryFn: () => fetchQuestionAnswer({ data: id }),
    enabled: !!id,
  });
