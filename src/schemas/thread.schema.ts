import { z } from "zod";
import { userSchema } from "./user.schema";
import { categorySchema } from "./category.schema";

export const threadSchema = z.object({
  uid: z.string().uuid().optional(),
  title: z
    .string()
    .trim()
    .min(5, { message: "Judul minimal 5 karakter" })
    .max(50, { message: "Judul maksimal 50 karakter" }),
  category: categorySchema,
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
