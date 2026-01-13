import React, { createContext, useContext, ReactNode } from "react";
import { useMobileNavLogic } from "./useMobileNav";

type MobileNavContextType = ReturnType<typeof useMobileNavLogic>;

const MobileNavContext = createContext<MobileNavContextType | undefined>(
  undefined,
);

export const MobileNavProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: MobileNavContextType;
}) => {
  return (
    <MobileNavContext.Provider value={value}>
      {children}
    </MobileNavContext.Provider>
  );
};

export const useMobileNav = () => {
  const context = useContext(MobileNavContext);
  if (context === undefined) {
    throw new Error("useMobileNav must be used within a MobileNavProvider");
  }
  return context;
};
