import { z } from "zod";
import { userSchema } from "./user.schema";

export const commentSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  author: userSchema,
});

export type Comment = z.infer<typeof commentSchema>;
