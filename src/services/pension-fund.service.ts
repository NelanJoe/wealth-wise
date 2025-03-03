import {
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import auth from "@/lib/firebase/auth";
import db from "@/lib/firebase/db";

import type { PensionFundType } from "@/schemas/calculator.schema";
import type { User } from "@/schemas/user.schema";

export const savePensionFund = async ({
  monthlyExpensesLater,
  yearsLater,
  inflation,
  annualReturn,
  resultPensionFund,
}: {
  monthlyExpensesLater: string;
  yearsLater: number;
  inflation: string;
  annualReturn: string;
  resultPensionFund: number;
}) => {
  try {
    const pensionFundRef = collection(db, "pension-fund");

    const { uid, displayName, email, photoURL } = auth.currentUser as User;
    const createdAt = new Date().toISOString();

    await addDoc(pensionFundRef, {
      monthlyExpensesLater,
      yearsLater,
      inflation,
      annualReturn,
      resultPensionFund,
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

    throw new Error("An error occurred while saving pension fund.");
  }
};

export const getPensionFund = async () => {
  try {
    const pensionFundRef = collection(db, "pension-fund");

    const q = query(
      pensionFundRef,
      where("author.uid", "==", auth.currentUser?.uid)
    );

    const pensionFundSnapshot = await getDocs(q);
    const pensionFund = pensionFundSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        uid: doc.id,
      } as PensionFundType;
    }) as PensionFundType[];

    const pensionFundSorted = pensionFund.sort(
      (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
    );

    return pensionFundSorted;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while fetching pension fund.");
  }
};

export const deletePensionFund = async (pensionFundId: string) => {
  try {
    if (!pensionFundId) throw new Error("Pension fund id is required.");

    const pensionFundRef = doc(db, "pension-fund", pensionFundId);
    await deleteDoc(pensionFundRef);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error(
      `An error occurred while deleting pension fund with id ${pensionFundId}`
    );
  }
};
