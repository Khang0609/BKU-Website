import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { mockMessages } from "@/lib/mockData";

export const useMessage = () => {
  // --------- STATE ----------
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedContact, setSelectedContact] = useState<string | null>(
    null, // Start with no selection for better mobile UX (start at inbox)
  );

  // --------- FUNCTION ----------
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --------- GETTER ----------
  const isRead = (message: any) => {
    return message ? !message.read : false;
  };
  const lastMessage = (contact: any, mockMessages: any) => {
    return mockMessages.find((m: any) => m.sender === contact);
  };
  // Simple logic to determine if active/read for demo styling
  const isSelected = (selectedContact: any, contact: any) => {
    return selectedContact === contact;
  };
  const contacts = Array.from(new Set(mockMessages.map((m) => m.sender)));
  // Filter messages for the selected contact
  const currentMessages = selectedContact
    ? mockMessages.filter((m) => m.sender === selectedContact)
    : [];

  // --------- EFFECT ----------
  useEffect(() => {
    scrollToBottom();
  }, [messageText]);

  // --------- EVENT ----------
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && messageText.trim()) {
      // Handle send logic
      setMessageText("");
    }
  };

  // --------- RETURN ----------
  return {
    // #region --------- MAIN PAGE ---------
    selectedContact,
    setSelectedContact,
    contacts,
    currentMessages,
    mockMessages,
    // #endregion

    // #region --------- CHAT WINDOW ---------
    messageText,
    setMessageText,
    messagesEndRef,
    scrollToBottom,
    handleKeyDown,
    //#endregion

    // #region --------- CONSERVATION LIST -----------
    isRead,
    lastMessage,
    isSelected,
    //#endregion
  };
};
