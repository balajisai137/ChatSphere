import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/config";

export const loginUser =
  async (email, password) => {
    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    await updateDoc(
      doc(
        db,
        "users",
        userCredential.user.uid
      ),
      {
        online: true,
        lastSeen:
          serverTimestamp(),
      }
    );

    return userCredential;
  };

export const signupUser =
  async (
    username,
    email,
    password
  ) => {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await setDoc(
      doc(
        db,
        "users",
        userCredential.user.uid
      ),
      {
        username,
        email,
        online: true,
      }
    );

    return userCredential;
  };

export const logoutUser =
  async (uid) => {
    await updateDoc(
      doc(db, "users", uid),
      {
        online: false,
        lastSeen:
          serverTimestamp(),
      }
    );

    await signOut(auth);
  };