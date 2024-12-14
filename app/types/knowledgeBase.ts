import { z } from "zod";

export enum difficulty {
  ELEMENTARY = "elementary",
  MIDDLE = "middle",
  HIGH = "high",
  COLLEGE = "college",
  UNSPECIFIED = "unspecified",
}

export const difficultyLabels: Record<difficulty, string> = {
  [difficulty.ELEMENTARY]: "Elementary",
  [difficulty.MIDDLE]: "Middle School",
  [difficulty.HIGH]: "High School",
  [difficulty.COLLEGE]: "College",
  [difficulty.UNSPECIFIED]: "Unspecified",
};

export enum levelOfDetail {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export const levelOfDetailLabels: Record<levelOfDetail, string> = {
  [levelOfDetail.LOW]: "Basic",
  [levelOfDetail.MEDIUM]: "Intermediate",
  [levelOfDetail.HIGH]: "Advanced",
};

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
  OTHER = "other",
}

export const subjectLabels: Record<subject, string> = {
  [subject.MATH]: "Mathematics",
  [subject.SCIENCE]: "Science",
  [subject.HISTORY]: "History",
  [subject.LANGUAGE]: "Language",
  [subject.LITERATURE]: "Literature",
  [subject.ART]: "Art",
  [subject.BIOLOGY]: "Biology",
  [subject.CHEMISTRY]: "Chemistry",
  [subject.GEOGRAPHY]: "Geography",
  [subject.COMPUTER_SCIENCE]: "Computer Science",
  [subject.PHYSICS]: "Physics",
  [subject.PSYCHOLOGY]: "Psychology",
  [subject.OTHER]: "Other",
};

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

export type KnowledgeBase = {
  id: string;
  title: string;
  difficulty: difficulty;
  levelOfDetail: levelOfDetail;
  subject: subject;
};

export type KnowledgeBaseWithUser = KnowledgeBase & {
  user: {
    name: string;
    email: string;
  };
};
