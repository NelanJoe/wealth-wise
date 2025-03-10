import { z } from "zod";

export const categorySchema = z.object({
  uid: z.string().uuid(),
  name: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
