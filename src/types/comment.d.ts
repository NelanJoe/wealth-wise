import type { User } from "./user";

export type Comment = {
  id: string;
  text: string;
  createdAt: Date;
  author: User;
};
