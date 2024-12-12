import { z } from "zod";

export enum difficulty {
  ELEMENTARY = "elementary",
  MIDDLE = "middle",
  HIGH = "high",
  COLLEGE = "college",
  UNSPECIFIED = "unspecified",
}

export enum levelOfDetail {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum subject {
  MATH = "math",
  SCIENCE = "science",
  HISTORY = "history",
  LANGUAGE = "language",
  LITERATURE = "literature",
  ART = "art",
  BIOLOGY = "biology",
  CHEMISTRY = "chemistry",
  GEOGRAPHY = "geography",
  COMPUTER_SCIENCE = "computer_science",
  PHYSICS = "physics",
  PSYCHOLOGY = "psychology",
}

export const createKnowledgeBaseSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  difficulty: z.nativeEnum(difficulty),
  levelOfDetail: z.nativeEnum(levelOfDetail),
  subject: z.nativeEnum(subject),
  language: z
    .string()
    .min(2, { message: "Language must be at least 2 characters" })
    .optional(),
});

export const updateKnowledgeBaseSchema = createKnowledgeBaseSchema.partial();

export type CreateKnowledgeBaseModel = z.infer<
  typeof createKnowledgeBaseSchema
>;

export type UpdateKnowledgeBaseModel = z.infer<
  typeof updateKnowledgeBaseSchema
>;

