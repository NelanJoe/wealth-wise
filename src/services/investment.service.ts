import auth from "@/libs/firebase/auth";
import db from "@/libs/firebase/db";
import {
  addDoc,
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
  where,
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
    const updatedAt = createdAt;

    await addDoc(investmentsRef, {
      currentlyAmount,
      monthlySaving,
      annualReturn,
      years,
      resultInvestment,
      createdAt,
      updatedAt,
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

    const q = query(
      investmentsRef,
      where("author.uid", "==", auth.currentUser?.uid)
    );

    const investmentsSnapshot = await getDocs(q);
    const investments = investmentsSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        uid: doc.id,
      } as InvestmentType;
    }) as InvestmentType[];

    const investmentsSorted = investments.sort(
      (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
    );

    return investmentsSorted;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while fetching investments.");
  }
};

export const deleteInvestment = async (investmentId: string) => {
  try {
    if (!investmentId) throw new Error("Investment id is required.");

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
