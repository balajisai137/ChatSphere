import useMessages from "../../hooks/useMessages";
import { useEffect, useState, useRef } from "react";
import generateChatId from "../../utils/generateChatId";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../../firebase/config";

import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  selectedUser,
  setMobileSidebarOpen,
}) {
  const bottomRef = useRef(null);


  const [typingUsers, setTypingUsers] =
    useState([]);

  // CHAT ID
  const chatId = selectedUser
    ? [
      auth.currentUser.uid,
      selectedUser.id,
    ]
      .sort()
      .join("_")
    : null;

  // MESSAGES EFFECT
  const messages = useMessages(
    auth.currentUser.uid,
    selectedUser?.id
  );
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // TYPING EFFECT
  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = onSnapshot(
      collection(
        db,
        "chats",
        chatId,
        "typing"
      ),
      (snapshot) => {
        const users = snapshot.docs
          .map((doc) => doc.data())
          .filter(
            (u) =>
              u.email !==
              auth.currentUser.email &&
              u.typing
          );

        setTypingUsers(users);
      }
    );

    return () => unsubscribe();
  }, [chatId]);

  if (!selectedUser) {
    return (
      <div
        className="
        flex-1
        h-screen
        flex
        items-center
        justify-center
        text-gray-500
        text-lg
        relative
      "
      >
        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMobileSidebarOpen(true)
          }
          className="
          md:hidden
          absolute
          top-5
          left-5
          text-white
          text-2xl
        "
        >
          ☰
        </button>

        Select a conversation 👋
      </div>
    );
  }
  return (
    <div className="flex-1 h-screen flex flex-col relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-20 right-20 w-100 h-100 bg-fuchsia-500/10 blur-3xl rounded-full"></div>

      {/* Header */}
      <div
        className="
          h-22.5
          border-b border-white/10
          bg-white/3
          backdrop-blur-xl
          px-4 md:px-8
          flex
          items-center
          justify-between
          relative
          z-10
        "
      >
        {typingUsers.length > 0 && (
          <div className="px-8 pt-3 text-sm text-fuchsia-300">
            {typingUsers[0].email} is typing...
          </div>
        )}
        <button
          onClick={() =>
            setMobileSidebarOpen(true)
          }
          className="
    md:hidden
    mr-4
    text-white
    text-2xl
  "
        >
          ☰
        </button>
        {/* User */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div
              className="
                w-14
                h-14
                rounded-full
                bg-linear-to-br
                from-fuchsia-500
                to-violet-500
                flex
                items-center
                justify-center
                text-white
                font-semibold
              "
            >
              A
            </div>

            {/* Online */}
            <div
              className="
                absolute
                bottom-0
                right-0
                w-4
                h-4
                rounded-full
                bg-green-400
                border-2
                border-[#050505]
              "
            ></div>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-white text-lg font-semibold">
              {selectedUser
                ? selectedUser.email
                : "Select a user"}
            </h2>

            
              <p
                className={`
    text-sm

    ${selectedUser?.online
                    ? "text-green-400"
                    : "text-gray-400"
                  }
  `}
              >
                {selectedUser?.online
                  ? "Online"
                  : "Offline"}
              </p>
            
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-4 md:px-8
          py-6
          space-y-4
          relative
          z-10
        "
      >
        {messages.map((message) => (
          <MessageBubble
            seen={message.seen}
            key={message.id}
            text={message.text}
            sender={
              message.senderId === auth.currentUser.uid
                ? "me"
                : "other"
            }
            time={
              message.createdAt?.toDate
                ? message.createdAt
                  .toDate()
                  .toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""
            }
          />
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="p-6 px-4 md:px-8 relative z-10">
        <MessageInput selectedUser={selectedUser} />
      </div>
    </div>
  );
}