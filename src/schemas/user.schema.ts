import { z } from "zod";

export const userSchema = z.object({
  uid: z.string(),
  displayName: z.string(),
  email: z.string().email(),
  photoURL: z.string().url(),
});

export type User = z.infer<typeof userSchema>;
