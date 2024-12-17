import { baseApi } from "@/services/baseApi";
import { createServerFn } from "@tanstack/start";
import { findOneSchema } from "./base";
import { MathProblem } from "@/types/math-problem";
import { queryOptions } from "@tanstack/react-query";

export const fetchMathProblem = createServerFn({ method: "GET" })
  .validator((id: number) => findOneSchema.parse({ id }))
  .handler(async ({ data }) => {
    try {
      const response = await baseApi.get<MathProblem>(
        `/math-problems/${data.id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching math problem:", error);
      throw error;
    }
  });

export const mathProblemQueryOptions = (id: number) =>
  queryOptions({
    staleTime: 1000 * 60 * 5,
    queryKey: ["mathProblem", id],
    queryFn: () => fetchMathProblem({ data: id }),
    enabled: !!id,
  });
