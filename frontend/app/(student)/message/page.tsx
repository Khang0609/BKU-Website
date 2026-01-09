"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mockMessages } from "@/lib/mockData";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

export default function MessagesPage() {
  // Mobile UX: "Back" returns to list (selectedContact = null on mobile state, or just shared state)
  // We use a shared state. If selectedContact is set:
  // - Mobile: Show Chat overlay.
  // - Desktop: Show Chat in right pane.
  const [selectedContact, setSelectedContact] = useState<string | null>(
    null, // Start with no selection for better mobile UX (start at inbox)
  );

  const contacts = Array.from(new Set(mockMessages.map((m) => m.sender)));

  // Filter messages for the selected contact
  const currentMessages = selectedContact
    ? mockMessages.filter((m) => m.sender === selectedContact)
    : [];

  return (
    <div className="relative flex h-[calc(100vh-4rem)] overflow-hidden bg-white">
      {/* Left Sidebar (Inbox) */}
      {/* On mobile: Always visible (underneath the chat overlay).
          On desktop: Always visible as left column. */}
      <div className="h-full w-full flex-shrink-0 border-gray-200 lg:w-80 lg:border-r xl:w-96">
        <ConversationList
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          mockMessages={mockMessages}
        />
      </div>

      {/* Right Content (Chat) - Desktop View */}
      {/* Hidden on mobile, Flex on Desktop */}
      <div className="hidden h-full flex-1 bg-gray-50 lg:flex">
        {selectedContact ? (
          <ChatWindow
            selectedContact={selectedContact}
            messages={currentMessages}
            onBack={() => setSelectedContact(null)} // Not really used on desktop but required by prop
          />
        ) : (
          <ChatWindow selectedContact={null} messages={[]} onBack={() => {}} />
        )}
      </div>

      {/* Right Content (Chat) - Mobile Overlay */}
      {/* Only rendered if selectedContact is true.
          Uses Framer Motion to slide in over the inbox.
          Hidden on desktop via CSS (lg:hidden) so it doesn't duplicate. */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 h-full w-full bg-white lg:hidden"
            style={{ top: 0, paddingBottom: 0 }} // Ensure full coverage
          >
            {/* Note: We might need to adjust 'top' if there's a global header we want to respect or cover.
                 User said "cover the full screen". 'fixed inset-0' covers everything including global header.
                 If we want to keep global header, we might use 'absolute' within the relative container,
                 but the container has h-[calc(100vh-4rem)].
                 Let's try 'absolute' first to respect the layout's bounds.
             */}
            <div className="h-full w-full">
              <ChatWindow
                selectedContact={selectedContact}
                messages={currentMessages}
                onBack={() => setSelectedContact(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
