import { collection, getDocs, orderBy, query } from "firebase/firestore";
import db from "@/lib/firebase/db";
import { Comment } from "@/schemas/comment.schema";

export const getComments = async (threadId: string) => {
  try {
    const threadCommentsRef = collection(db, "posts", threadId, "comments");

    const q = query(threadCommentsRef, orderBy("createdAt", "desc"));

    const threadCommentsSnapshot = await getDocs(q);
    const threadComments = threadCommentsSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as Comment;
    }) as Comment[];

    return threadComments;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while fetching comments.");
  }
};
