import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import db from "@/libs/firebase/db";
import auth from "@/libs/firebase/auth";

import type { User } from "@/schemas/user.schema";
import type { Thread } from "@/schemas/thread.schema";

export const getThreads = async () => {
  try {
    const threadsRef = collection(db, "threads");

    const q = query(threadsRef, orderBy("createdAt", "desc"));

    const threadsSnapshot = await getDocs(q);
    const threads = threadsSnapshot.docs.map(
      (doc) =>
        ({
          uid: doc.id,
          ...doc.data(),
        } as Thread)
    ) as Thread[];

    return threads;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while fetching threads.");
  }
};

export const getThread = async (threadId: string) => {
  try {
    const threadRef = doc(db, "threads", threadId);

    const threadSnapshot = await getDoc(threadRef);

    if (!threadSnapshot.exists()) throw new Error("Thread not found");

    const thread = threadSnapshot.data() as Thread;
    return thread;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while fetching thread.");
  }
};

export const createThread = async ({
  title,
  body,
  category,
}: Pick<Thread, "title" | "body" | "category">) => {
  try {
    const threadRef = collection(db, "threads");
    const createdAt = new Date().toISOString();

    const { uid, displayName, email, photoURL } = auth.currentUser as User;

    await addDoc(threadRef, {
      title,
      body,
      category,
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

    throw new Error("An error occurred while creating a thread.");
  }
};

export const deleteThread = async (threadId: string) => {
  try {
    if (!threadId) throw new Error("Thread id is required.");

    const threadRef = doc(db, "threads", threadId);
    await deleteDoc(threadRef);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while deleteing a thread");
  }
};
