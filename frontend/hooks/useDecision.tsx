import { useState, useEffect, useCallback } from "react";
import { DecisionProps } from "@/types/decision";
import { BASE_URL } from "@/lib/api";
import { authFetch } from "@/lib/authFetch";

export const useDecision = () => {
  const [decisions, setDecisions] = useState<DecisionProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecisions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authFetch(`${BASE_URL}/profile/student/decision`);
      if (!response.ok) {
        throw new Error("Failed to fetch decisions");
      }
      const data: DecisionProps[] = await response.json();
      setDecisions(data);
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
