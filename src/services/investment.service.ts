import auth from "@/lib/firebase/auth";
import db from "@/lib/firebase/db";
import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import type { User } from "@/schemas/user.schema";
import type { InvestmentType } from "@/schemas/calculator.schema";

export const saveInvestment = async ({
  currentlyAmount,
  monthlySaving,
  annualReturn,
  years,
  resultInvestment,
}: {
  currentlyAmount: string;
  monthlySaving: string;
  annualReturn: string;
  years: string;
  resultInvestment: number;
}) => {
  try {
    const investmentsRef = collection(db, "investments");

    const { uid, displayName, email, photoURL } = auth.currentUser as User;
    const createdAt = new Date().toISOString();

    await addDoc(investmentsRef, {
      currentlyAmount,
      monthlySaving,
      annualReturn,
      years,
      resultInvestment,
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

    throw new Error("An error occurred while saving investment.");
  }
};

export const getInvestments = async () => {
  try {
    const investmentsRef = collection(db, "investments");

    const q = query(investmentsRef, orderBy("createdAt", "desc"));

    const investmentsSnapshot = await getDocs(q);
    const investments = investmentsSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        uid: doc.id,
      } as InvestmentType;
    }) as InvestmentType[];

    return investments;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while fetching investments.");
  }
};

export const deleteInvestment = async (investmentId: string) => {
  try {
    const investmentRef = doc(db, "investments", investmentId);
    await deleteDoc(investmentRef);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error(
      `An error occurred while deleting investment with id ${investmentId}`
    );
  }
};
