"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useMessage } from "@/app/(student)/_hooks/useMessage";

// Infer the return type of the hook
type UseMessageReturnType = ReturnType<typeof useMessage>;

const MessageContext = createContext<UseMessageReturnType | undefined>(
  undefined,
);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const messageLogic = useMessage();

  return (
    <MessageContext.Provider value={messageLogic}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
