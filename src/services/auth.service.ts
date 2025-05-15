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

import db from "@/libs/firebase/db";
import auth from "@/libs/firebase/auth";
import { acessToken } from "@/libs/access-token";

import type { Login, Register } from "@/schemas/auth.schema";
import type { User } from "@/schemas/user.schema";
import { generateAvatar } from "@/libs/generate-avatar";

const customAuthErrorMessages: Record<string, string> = {
  "auth/invalid-email": "Format email yang Anda masukkan tidak valid.",
  "auth/user-disabled":
    "Akun Anda telah dinonaktifkan. Silakan hubungi dukungan.",
  "auth/user-not-found":
    "Tidak ada akun yang terdaftar dengan email ini. Silakan daftar jika Anda belum memiliki akun.",
  "auth/wrong-password":
    "Kata sandi yang Anda masukkan salah. Silakan coba lagi.",
  "auth/too-many-requests":
    "Terlalu banyak permintaan. Silakan coba lagi dalam beberapa menit.",
  "auth/email-already-in-use":
    "Email ini sudah terdaftar. Silakan gunakan email lain atau masuk ke akun Anda.",
  "auth/invalid-credential":
    "Kombinasi email dan kata sandi Anda tidak valid. Silakan coba lagi.",
};

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
  userAuth: UserFirebaseType;
  additionalInformation?: AdditionalInformation;
}): Promise<void> => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { uid, displayName, email, photoURL } = userAuth;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    try {
      await setDoc(userRef, {
        uid,
        displayName,
        email,
        photoURL,
        createdAt,
        updatedAt,
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

    if (!user) {
      throw new Error("An error occurred while logging in.");
    }

    const token = await user.getIdToken();
    acessToken.set(token);

    return user as UserFirebaseType;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(customAuthErrorMessages[error.code] || error.message);
    }

    throw error;
  }
};

export const register = async ({
  username,
  email,
  password,
}: Pick<Register, "username" | "email" | "password">) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!user) {
      throw new Error("An error occurred while registering.");
    }

    await createUserFromAuth({
      userAuth: {
        ...user,
        displayName: username,
        photoURL: generateAvatar(username),
      },
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      const customErrorMessage =
        customAuthErrorMessages[error.code] || error.message;
      throw new Error(customErrorMessage);
    }

    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    const token = credential?.idToken;
    const user = result.user as UserFirebaseType;

    if (!user || !token) {
      throw new Error(`An error occurred while logging in with Google.`);
    }

    await createUserFromAuth({ userAuth: user });
    acessToken.set(token);

    return { ...user };
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessages: Record<string, string> = {
        "auth/popup-closed-by-user": "Login dibatalkan oleh pengguna.",
        "auth/network-request-failed": "Koneksi internet bermasalah.",
      };

      throw new Error(
        errorMessages[error.code] || "Gagal login dengan Google."
      );
    }

    throw error;
  }
};

export const getCurrentUser = () => {
  return new Promise<User>((resolve, reject) => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        reject(new Error("User not found."));
      } else {
        resolve({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        } as User);
      }
    });
  });
};

export const updateProfileUser = async ({ userName }: { userName: string }) => {
  try {
    const currentUser = auth.currentUser as UserFirebaseType;
    if (!currentUser) {
      throw new Error("User tidak ditemukan.");
    }

    if (currentUser.photoURL === "" || currentUser.photoURL === null) {
      await updateProfile(currentUser, {
        photoURL: generateAvatar(userName),
      });
    } else {
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
    await acessToken.remove();
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while logging out.");
  }
};
