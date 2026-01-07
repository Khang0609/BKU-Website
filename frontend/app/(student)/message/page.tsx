"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Search, User } from "lucide-react";
import { mockMessages } from "@/lib/mockData";

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState<string | null>(
    mockMessages[0]?.sender || null
  );
  const [messageText, setMessageText] = useState("");

  const contacts = Array.from(new Set(mockMessages.map((m) => m.sender)));

  return (
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Contacts Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Messages
            </h2>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search contacts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact, index) => {
              const lastMessage = mockMessages.find(
                (m) => m.sender === contact
              );
              return (
                <motion.button
                  key={contact}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                    selectedContact === contact
                      ? "bg-blue-50 border-l-4 border-l-secondary"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {contact
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {contact}
                        </h3>
                        {!lastMessage?.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {lastMessage?.content}
                      </p>
                      <span className="text-xs text-gray-400">
                        {lastMessage?.timestamp}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-semibold">
                    {selectedContact
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedContact}
                    </h3>
                    <p className="text-xs text-gray-500">Active now</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {mockMessages
                  .filter((m) => m.sender === selectedContact)
                  .map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </div>
                      <div className="flex-1">
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                          <p className="text-sm text-gray-900">
                            {message.content}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {message.timestamp}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && messageText.trim()) {
                        // Handle send message
                        setMessageText("");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (messageText.trim()) {
                        // Handle send message
                        setMessageText("");
                      }
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                  >
                    <Send size={18} />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare
                  className="mx-auto text-gray-400 mb-4"
                  size={64}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600">
                  Choose a contact to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
