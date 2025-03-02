import { z } from "zod";
import { userSchema } from "./user.schema";

export const threadSchema = z.object({
  uid: z.string(),
  title: z
    .string()
    .trim()
    .min(5, { message: "Judul minimal 5 karakter" })
    .max(50, { message: "Judul maksimal 50 karakter" }),
  category: z.string(),
  body: z
    .string()
    .trim()
    .min(10, { message: "Isi thread minimal 10 karakter" })
    .max(1000, { message: "Isi thread maksimal 1000 karakter" }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  author: userSchema,
});

export type Thread = z.infer<typeof threadSchema>;
