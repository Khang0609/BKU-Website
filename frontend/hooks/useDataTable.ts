import { useState, useMemo } from "react";
import {
  SortConfig,
  SortOrder,
} from "@/types/components_type/data_table";

export const useDataTable = <T>(initialData: T[] = []) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  const requestSort = (key: string) => {
    let direction: SortOrder = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({ key: direction ? key : null, direction });
  };

  const items = useMemo(() => {
    // If no sorting is applied, return the original data
    if (!sortConfig.key || !sortConfig.direction) {
      return initialData;
    }

    // Create a shallow copy before sorting to avoid mutating props
    const sortedItems = [...initialData];

    return sortedItems.sort((a: any, b: any) => {
      if (!sortConfig.key) return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle null/undefined values safely
      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // Numerical sorting
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      // String sorting
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();

      if (aString < bString) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aString > bString) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [initialData, sortConfig]);

  return { items, requestSort, sortConfig };
};
