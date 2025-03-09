import { z } from "zod";
import { userSchema } from "./user.schema";

export const commentSchema = z.object({
  uid: z.string().uuid().optional(),
  text: z
    .string()
    .trim()
    .min(1, { message: "Komentar tidak boleh kosong" })
    .max(500, { message: "Komentar maksimal 500 karakter" }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  author: userSchema,
});

export type Comment = z.infer<typeof commentSchema>;
