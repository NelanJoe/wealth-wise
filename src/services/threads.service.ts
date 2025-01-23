import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import db from "@/lib/firebase/db";
import auth from "@/lib/firebase/auth";

import type { Thread } from "@/schemas/thread.schema";
import type { User } from "@/schemas/user.schema";

export const getThreads = async () => {
  try {
    const threadsRef = collection(db, "posts");

    const q = query(threadsRef, orderBy("createdAt", "desc"));

    const threadsSnapshot = await getDocs(q);
    const threads = threadsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Thread)
    ) as Thread[];

    return threads;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while fetching threads.");
  }
};

export const getThread = async (threadId: string) => {
  try {
    const threadRef = doc(db, "posts", threadId);

    const threadSnapshot = await getDoc(threadRef);

    if (!threadSnapshot.exists()) throw new Error("Thread not found");

    const thread = threadSnapshot.data() as Thread;
    return thread;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    console.log("THREAD SERVICE", error);

    throw new Error("An error occurred while fetching thread.");
  }
};

export const createThread = async ({
  title,
  body,
  category,
}: Pick<Thread, "title" | "body" | "category">) => {
  try {
    const threadRef = collection(db, "posts");
    const createdAt = new Date().toISOString();

    const { uid, displayName, email, photoURL } = auth.currentUser as User;

    await addDoc(threadRef, {
      title,
      body,
      category,
      createdAt,
      author: {
        id: uid,
        displayName,
        email,
        photoURL,
        createdAt,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while creating a thread.");
  }
};
