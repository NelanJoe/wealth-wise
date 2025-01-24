import { z } from "zod";
import { userSchema } from "./user.schema";

export const threadSchema = z.object({
  uid: z.string(),
  title: z.string(),
  category: z.string(),
  body: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  author: userSchema,
});

export type Thread = z.infer<typeof threadSchema>;
