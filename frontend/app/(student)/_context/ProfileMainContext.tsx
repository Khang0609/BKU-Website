import React, { createContext, useContext } from "react";
import { useProfileMain } from "@/app/(student)/_hooks/profile/main/useProfileMain";

// Define the type of the context based on the return type of useProfileMain
// We can use ReturnType helper to infer it directly from the hook
type ProfileMainContextType = ReturnType<typeof useProfileMain>;

// 1. Create the Context with null as initial value (will be populated by Provider)
const ProfileMainContext = createContext<ProfileMainContextType | null>(null);

// 2. Create the Provider component
export const ProfileMainProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Use the hook to get all the data and logic
  const profileData = useProfileMain();

  return (
    <ProfileMainContext.Provider value={profileData}>
      {children}
    </ProfileMainContext.Provider>
  );
};

// 3. Create a custom hook to consume the context
export const useProfileMainContext = () => {
  const context = useContext(ProfileMainContext);
  if (!context) {
    throw new Error(
      "useProfileMainContext must be used within a ProfileMainProvider",
    );
  }
  return context;
};
