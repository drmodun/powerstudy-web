import { z } from "zod";

export const createUserSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/,
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    //TODO: maybe make a profile picture later
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const updateSchema = createUserSchema.sourceType().partial();

export type CreateUserModel = z.infer<typeof createUserSchema>;
export type UpdateUserModel = z.infer<typeof updateSchema>;
export type LoginModel = z.infer<typeof loginSchema>;

export type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  profilePicture: string;
};
