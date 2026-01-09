"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface ConversationListProps {
  contacts: string[];
  selectedContact: string | null;
  onSelectContact: (contact: string) => void;
  mockMessages: any[]; // Using any for simplicity as per existing code structure, ideally should be typed
}

export default function ConversationList({
  contacts,
  selectedContact,
  onSelectContact,
  mockMessages,
}: ConversationListProps) {
  return (
    <div className="flex h-full flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Chats</h2>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search Messenger"
            className="w-full rounded-full border-none bg-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact, index) => {
          const lastMessage = mockMessages.find((m) => m.sender === contact);
          // Simple logic to determine if active/read for demo styling
          const isSelected = selectedContact === contact;

          return (
            <motion.button
              key={contact}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => onSelectContact(contact)}
              className={`flex w-full cursor-pointer items-center gap-3 p-3 transition-colors hover:bg-gray-50 ${
                isSelected ? "bg-blue-50/60" : ""
              }`}
            >
              {/* Avatar */}
              <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white">
                {contact
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
                {/* Online Status Indicator (Mock) */}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1 text-left">
                <div className="flex justify-between">
                  <h3
                    className={`truncate text-sm font-semibold ${
                      !lastMessage?.read ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {contact}
                  </h3>
                  <span className="flex-shrink-0 text-xs text-gray-400">
                    {lastMessage?.timestamp || "12:00 PM"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <p
                    className={`truncate text-xs ${
                      !lastMessage?.read
                        ? "font-semibold text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {lastMessage?.content || "No messages yet"}
                  </p>
                  {!lastMessage?.read && (
                    <span className="ml-auto h-2 w-2 flex-shrink-0 rounded-full bg-blue-600"></span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
