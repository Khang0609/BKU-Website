"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Phone,
  Video,
  Info,
  ArrowLeft,
  Image,
  Smile,
} from "lucide-react";

interface ChatWindowProps {
  selectedContact: string | null;
  messages: any[];
  onBack: () => void; // For mobile back navigation
}

export default function ChatWindow({
  selectedContact,
  messages,
  onBack,
}: ChatWindowProps) {
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedContact]);

  if (!selectedContact) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-gray-50 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <Send className="h-10 w-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Your Messages</h3>
        <p className="mt-2 text-gray-500">
          Send private photos and messages to a friend or group.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Chat Header */}
      <div className="z-10 flex items-center justify-between border-b border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Back Button (Mobile Only) */}
          <button
            onClick={onBack}
            className="rounded-full p-2 text-blue-600 hover:bg-blue-50 lg:hidden"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
              {selectedContact
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"></span>
          </div>

          <div>
            <h3 className="font-semibold leading-tight text-gray-900">
              {selectedContact}
            </h3>
            <p className="text-xs font-medium text-green-600">Active now</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-blue-600">
          <button className="rounded-full p-2 hover:bg-blue-50">
            <Phone size={20} />
          </button>
          <button className="rounded-full p-2 hover:bg-blue-50">
            <Video size={20} />
          </button>
          <button className="rounded-full p-2 hover:bg-blue-50">
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area - Grow to fill space */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        {messages.map((message, index) => {
          const isMe = message.isMe || false; // Assume some logic for 'me', falling back to left align
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

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-3">
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 text-blue-600 hover:bg-gray-100">
            <Image size={24} />
          </button>
          <div className="flex flex-1 items-center rounded-full bg-gray-100 px-4 py-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Aa"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
              onKeyPress={(e) => {
                if (e.key === "Enter" && messageText.trim()) {
                  // Handle send logic
                  setMessageText("");
                }
              }}
            />
            <button className="ml-2 text-blue-600 hover:text-blue-700">
              <Smile size={24} />
            </button>
          </div>
          <button
            onClick={() => {
              if (messageText.trim()) setMessageText("");
            }}
            className="rounded-full p-2 text-blue-600 hover:bg-blue-50"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
