import { z } from "zod";

export const userSchema = z.object({
  uid: z.string(),
  displayName: z.string(),
  email: z.string().trim().email({ message: "Format email tidak valid" }),
  photoURL: z
    .string()
    .url({ message: "URL foto profil tidak valid" })
    .optional(),
});

export type User = z.infer<typeof userSchema>;
