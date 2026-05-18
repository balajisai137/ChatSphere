import { useState } from "react";
import {
  sendMessage,
} from "../../services/chatService";
import EmojiPicker from "emoji-picker-react";
import {
  setDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";

export default function MessageInput({
  selectedUser,
}) {
  const [showPicker, setShowPicker] =
    useState(false);
  const [message, setMessage] = useState("");
  const chatId = [
    auth.currentUser.uid,
    selectedUser.id,
  ]
    .sort()
    .join("_");

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      
        await sendMessage(
          auth.currentUser,
          selectedUser,
          message
        );

        setMessage("");
      
      
    } catch (error) {
      console.log("FIREBASE ERROR:", error);
      alert(error.message);
    }
  };
  const handleTyping = async (value) => {
    setMessage(value);

    if (!chatId) return;

    try {
      await setDoc(
        doc(
          db,
          "chats",
          chatId,
          "typing",
          auth.currentUser.uid
        ),
        {
          email: auth.currentUser.email,
          typing: value.length > 0,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmojiClick = (emojiData) => {
    setMessage((prev) =>
      prev + emojiData.emoji
    );
  };
  return (
    <div
      className="
        w-full
        relative
        rounded-[28px]
        border border-white/10
        bg-white/4
        backdrop-blur-2xl
        px-4
        py-3
        flex
        items-center
        gap-4
        shadow-[0_0_30px_rgba(192,132,252,0.08)]
      "
    >
      {/* Emoji */}
      <div className="relative">
        <button
          onClick={() =>
            setShowPicker(!showPicker)
          }
          className="
      w-12
      h-12
      rounded-2xl
      bg-white/3
      border border-white/10
      flex
      items-center
      justify-center
      text-xl
      hover:bg-white/6
      transition-all
    "
        >
          😊
        </button>

        {showPicker && (
          <div className="absolute bottom-16 left-0 z-50">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme="dark"
            />
          </div>
        )}
      </div>
      {/* Input */}
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) =>
          handleTyping(e.target.value)
        }
        onKeyDown={(e) =>
          e.key === "Enter" && handleSend()
        }
        className="
          flex-1
          bg-transparent
          outline-none
          text-white
          placeholder:text-gray-500
          text-sm
        "
      />

      {/* Attachment */}
      <button
        className="
          w-12
          h-12
          rounded-2xl
          bg-white/3
          border border-white/10
          flex
          items-center
          justify-center
          text-lg
        "
      >
        📎
      </button>

      {/* Send */}
      <button
        onClick={handleSend}
        className="
          w-14
          h-14
          rounded-2xl
          bg-linear-to-br
          from-fuchsia-500
          to-violet-500
          flex
          items-center
          justify-center
          text-white
          text-xl
          shadow-[0_0_25px_rgba(192,132,252,0.35)]
          hover:scale-105
          transition-all
        "
      >
        ➤
      </button>
    </div>
  );
}