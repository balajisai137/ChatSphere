import { motion } from "framer-motion";

export default function MessageBubble({
  text,
  sender,
  time,
  seen,
}) {
  const isMe = sender === "me";

  return (
    <motion.div
      className={`
        
        flex
        ${isMe ? "justify-end" : "justify-start"}
      `}
    >

      <div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.95,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        transition={{
          duration: 0.25,
        }}
        className={`
          max-w-[90%] md:max-w-[75%]
          px-5
          py-3
          rounded-3xl
          border
          backdrop-blur-xl
          shadow-lg
          transition-all
          duration-300

          ${isMe
            ? `
                bg-linear-to-br
                from-fuchsia-500
                to-violet-500
                border-fuchsia-400/20
                text-white
                rounded-br-md
              `
            : `
                bg-white/4
                border-white/10
                text-gray-100
                rounded-bl-md
              `
          }
        `}
      >
        {/* Message */}
        <p className="text-sm leading-relaxed">
          {text}
        </p>
        {sender === "me" && (
          <div
            className={`
      text-[10px]
      mt-1
      text-right

      ${seen
                ? "text-fuchsia-200"
                : "text-gray-400"
              }
    `}
          >
            {seen ? "Seen" : "Sent"}
          </div>
        )}

        {/* Time */}
        <div
          className={`
            text-[11px]
            mt-2
            flex
            justify-end

            ${isMe
              ? "text-fuchsia-100"
              : "text-gray-500"
            }
          `}
        >
          {time}
        </div>
      </div>
    </motion.div>
  );
}