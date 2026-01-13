import { motion } from "framer-motion";
import { useMessageContext } from "@/app/(student)/_context/MessageContext";

export const MessageList = () => {
  const { currentMessages: messages, messagesEndRef } = useMessageContext();
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      {messages.map((message, index) => {
        const isMe = (message as any).isMe || false; // Assume some logic for 'me', falling back to left align
        return (
          <motion.div
            key={message.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            {!isMe && (
              <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-gray-600">
                {message.sender
                  ? message.sender
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .substring(0, 2)
                  : "?"}
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                isMe
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none border border-gray-200 bg-white text-gray-900"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </motion.div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};
