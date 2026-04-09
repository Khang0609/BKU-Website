"use client";

import { useState, useCallback } from "react";
import { DecisionProps } from "@/types/decision";
import client from "@/lib/client";

export const useDecision = (initialData: DecisionProps[] = []) => {
  const [decisions, setDecisions] = useState<DecisionProps[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Giảm xuống false vì có data rồi
  const [error, setError] = useState<string | null>(null);

  const fetchDecisions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await client.get("/profile/student/decision");
      setDecisions(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load decisions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    decisions,
    isLoading,
    error,
    refreshDecisions: fetchDecisions,
  };
};
