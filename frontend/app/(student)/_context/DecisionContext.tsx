"use client";

import React, { createContext, useContext } from "react";
import { DecisionProps } from "@/types/decision";
import { useDecision } from "@/app/(student)/_hooks/profile/decision/useDecision";

type DecisionContextType = ReturnType<typeof useDecision>;

const DecisionContext = createContext<DecisionContextType | null>(null);

export const DecisionProvider = ({
  children,
  initialData = [],
}: {
  children: React.ReactNode;
  initialData?: DecisionProps[];
}) => {
  const decisionData = useDecision(initialData);

  return (
    <DecisionContext.Provider value={decisionData}>
      {children}
    </DecisionContext.Provider>
  );
};

export const useDecisionContext = () => {
  const context = useContext(DecisionContext);
  if (!context) {
    throw new Error("useDecisionContext must be used within a DecisionProvider");
  }
  return context;
};
