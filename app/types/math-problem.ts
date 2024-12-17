import { z } from "vinxi";
import { difficulty } from "./knowledgeBase";

export const mathProblemSchema = z.object({
  mathQuestion: z
    .string()
    .min(3, { message: "Question must be at least 3 characters" }),
  solution: z
    .string()
    .min(3, { message: "Answer must be at least 3 characters" }),
  difficulty: z.nativeEnum(difficulty).optional(),
});

export type MathProblemModel = z.infer<typeof mathProblemSchema>;

export type MathProblem = {
  id: number;
  mathQuestion: string;
  solution: string;
  updatedAt: Date;
  userId: number;
};
