import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Format email tidak valid" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: "Password minimal 6 karakter" })
    .max(20, { message: "Password maksimal 20 karakter" }),
});

export const registerSchema = z
  .object({
    username: z.string().min(3, { message: "Name minimal 3 karakter" }),
    email: z
      .string()
      .email({ message: "Format email tidak valid" })
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(6, { message: "Password minimal 6 karakter" })
      .max(20, { message: "Password maksimal 20 karakter" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama dengan ConfirmPassword",
    path: ["confirmPassword"],
  });

export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;
