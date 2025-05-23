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

import db from "@/libs/firebase/db";
import auth from "@/libs/firebase/auth";

import type { User } from "@/schemas/user.schema";
import type { EmergencyFundType } from "@/schemas/calculator.schema";

export const saveEmergencyFund = async ({
  status,
  dependents,
  monthlyExpenses,
  resultEmergencyFund,
}: Omit<EmergencyFundType, "uid" | "author" | "createdAt" | "updatedAt">) => {
  try {
    const emergencyFundRef = collection(db, "emergency-fund");
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const { uid, displayName, email, photoURL } = auth.currentUser as User;

    await addDoc(emergencyFundRef, {
      status,
      dependents,
      monthlyExpenses,
      resultEmergencyFund,
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

    throw new Error("An error occurred while saving emergency fund.");
  }
};

export const getEmergencyFund = async () => {
  try {
    const emergencyFundRef = collection(db, "emergency-fund");

    const q = query(
      emergencyFundRef,
      where("author.uid", "==", auth.currentUser?.uid)
    );

    const emergencyFundSnapshot = await getDocs(q);
    const emergencyFund = emergencyFundSnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        uid: doc.id,
      } as EmergencyFundType;
    }) as EmergencyFundType[];

    const sortedEmergencyFund = emergencyFund.sort(
      (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
    );

    return sortedEmergencyFund;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(`An error occurred while fetching emergency fund.`);
  }
};

export const deleteEmergencyFund = async (emergencyFundId: string) => {
  try {
    if (!emergencyFundId) throw new Error("Emergency fund id is required.");

    const emergencyFundRef = doc(db, "emergency-fund", emergencyFundId);
    await deleteDoc(emergencyFundRef);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(
      `An error occurred while deleting emergency fund with id ${emergencyFundId}`
    );
  }
};
