import { z } from "vinxi";

export const noteSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z
    .string()
    .min(3, { message: "Content must be at least 3 characters" }),
});

export type Note = {
  id: number;
  title: string;
  content: string;
  knowledgeBaseId: number;
};

export type NoteExtended = Note & {
  name: string;
  updatedAt: Date;
  createdAt: Date;
  knowledgeBaseTitle: string;
  profilePicture: string;
};

// TODO: maybe add email for sub info
