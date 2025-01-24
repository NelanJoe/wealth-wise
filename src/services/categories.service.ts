import { collection, getDocs, query } from "firebase/firestore";
import db from "@/lib/firebase/db";
import type { Category } from "@/schemas/category.schema";

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

    throw new Error("An error occurred while fetching categories.");
  }
};
