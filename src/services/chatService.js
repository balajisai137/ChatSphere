import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import generateChatId
  from "../utils/generateChatId";

export const sendMessage =
  async (
    currentUser,
    selectedUser,
    text
  ) => {
    const chatId =
      generateChatId(
        currentUser.uid,
        selectedUser.id
      );

    await setDoc(
      doc(db, "chats", chatId),
      {
        users: [
          currentUser.uid,
          selectedUser.id,
        ],
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    await addDoc(
      collection(
        db,
        "chats",
        chatId,
        "messages"
      ),
      {
        text,
        senderId: currentUser.uid,
        createdAt: serverTimestamp(),
        seen: false,
      }
    );
  };