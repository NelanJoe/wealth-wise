import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import db from "@/lib/firebase/db";
import { Thread } from "@/schemas/thread.schema";

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
