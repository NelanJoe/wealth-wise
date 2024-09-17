import { collection, getDocs, query } from "firebase/firestore";
import db from "@/lib/firebase/db";
import { Category } from "@/types/category";

export const getCategories = async () => {
  try {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef);

    const categoriesSnapshot = await getDocs(q);

    return categoriesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Category)
    ) as Category[];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
