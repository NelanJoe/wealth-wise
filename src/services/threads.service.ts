import { collection, getDocs, query } from "firebase/firestore";
import db from "@/lib/firebase/db";
import { Thread } from "@/types/thread";

export const getThreads = async () => {
  try {
    const threadsRef = collection(db, "posts");

    const q = query(threadsRef);

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
  }
};
