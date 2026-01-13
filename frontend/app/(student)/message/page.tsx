"use client";

import { AnimatePresence, motion } from "framer-motion";
import ConversationList from "@/app/(student)/_components/message/ConversationList";
import ChatWindow from "@/app/(student)/_components/message/ChatWindow";
import {
  MessageProvider,
  useMessageContext,
} from "@/app/(student)/_context/MessageContext";

const MessagePageContent = () => {
  const { selectedContact, setSelectedContact } = useMessageContext();

  return (
    <div className="relative flex h-full overflow-hidden bg-white">
      {/* Left Sidebar (Inbox) */}
      <div className="h-full w-full flex-shrink-0 border-gray-200 lg:w-80 lg:border-r xl:w-96">
        <ConversationList />
      </div>

      {/* Right Content (Chat) - Desktop View */}
      <div className="hidden h-full flex-1 bg-gray-50 lg:block">
        <ChatWindow />
      </div>

      {/* Right Content (Chat) - Mobile Overlay */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 h-full w-full bg-white lg:hidden"
            style={{ top: 0, paddingBottom: 0 }}
          >
            <div className="h-full w-full">
              <ChatWindow />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function MessagesPage() {
  return (
    <MessageProvider>
      <MessagePageContent />
    </MessageProvider>
  );
}
