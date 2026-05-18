import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/config";

import generateChatId
  from "../utils/generateChatId";

const useMessages = (
  currentUserId,
  selectedUserId
) => {
  const [messages, setMessages] =
    useState([]);

  useEffect(() => {
    if (!selectedUserId) return;

    const chatId =
      generateChatId(
        currentUserId,
        selectedUserId
      );

    const q = query(
      collection(
        db,
        "chats",
        chatId,
        "messages"
      ),
      orderBy("createdAt")
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {
        const msgs =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setMessages(msgs);
      });

    return () => unsubscribe();
  }, [
    currentUserId,
    selectedUserId,
  ]);

  return messages;
};

export default useMessages;