import type { Comment } from "./comment";
import type { User } from "./user";

export type Thread = {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  comments: Comment[];
  author: User;
};
