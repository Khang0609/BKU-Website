import { useState, useEffect, useCallback } from "react";
import { DecisionProps } from "@/types/decision";
import client from "@/lib/client";

export const useDecision = () => {
  const [decisions, setDecisions] = useState<DecisionProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  useEffect(() => {
    fetchDecisions();
  }, [fetchDecisions]);

  return {
    decisions,
    isLoading,
    error,
    refreshDecisions: fetchDecisions,
  };
};
