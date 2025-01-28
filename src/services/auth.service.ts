import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  updateProfile,
  type User as UserFirebaseType,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import db from "@/lib/firebase/db";
import auth from "@/lib/firebase/auth";

import type { Login, Register } from "@/schemas/auth.schema";
import type { User } from "@/schemas/user.schema";

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

type AdditionalInformation = {
  [key: string]: string | null;
};

export const createUserFromAuth = async ({
  userAuth,
  additionalInformation,
}: {
  userAuth: User;
  additionalInformation?: AdditionalInformation;
}): Promise<void> => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("An error occurred while creating user.");
    }
  }
};

export const login = async ({ email, password }: Login) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user as User;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while logging in.");
  }
};

export const register = async ({
  email,
  password,
}: Pick<Register, "email" | "password">) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while registering.");
  }
};

export const getCurrentUser = () => {
  return new Promise<User>((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userResult = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        } as User;

        resolve(userResult);
      } else {
        reject(new Error("User not found"));
      }
    });
  });
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    const token = credential?.accessToken;
    const user = result.user;

    return {
      ...user,
      token,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while logging in with Google.");
  }
};

export const updateProfileUser = async ({ userName }: { userName: string }) => {
  try {
    const currentUser = auth.currentUser as UserFirebaseType;
    if (currentUser) {
      await updateProfile(currentUser, {
        displayName: userName,
      });
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while updating user.");
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while logging out.");
  }
};
