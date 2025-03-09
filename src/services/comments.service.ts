import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import db from "@/lib/firebase/db";
import auth from "@/lib/firebase/auth";

import type { User } from "@/schemas/user.schema";
import type { Comment } from "@/schemas/comment.schema";

export const getComments = async (threadId: string) => {
  try {
    const threadCommentsRef = collection(db, "threads", threadId, "comments");

    const q = query(threadCommentsRef, orderBy("createdAt", "desc"));

    const threadCommentsSnapshot = await getDocs(q);
    const threadComments = threadCommentsSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        uid: doc.id,
      } as Comment;
    }) as Comment[];

    return threadComments;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while fetching comments.");
  }
};

export const createComment = async ({
  threadId,
  text,
}: {
  threadId: string;
  text: string;
}) => {
  try {
    const commentRef = collection(db, "threads", threadId, "comments");
    const createdAt = new Date().toISOString();

    const { uid, displayName, email, photoURL } = auth.currentUser as User;

    await addDoc(commentRef, {
      text,
      createdAt,
      author: {
        uid,
        displayName,
        email,
        photoURL,
      },
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while creating a comment.");
  }
};
