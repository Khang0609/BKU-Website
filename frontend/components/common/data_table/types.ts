import { ReactNode } from "react";

/**
 * Definition for a table column
 */
export interface ColumnDef<T> {
  /** The key access the data from the item object. Use a string for computed columns. */
  key: keyof T | string;
  /** Header label for the column */
  label: string;
  /** Whether the column can be sorted */
  sortable?: boolean;
  /** Optional custom render function for cell content */
  render?: (value: any, item: T) => ReactNode;
  /** Optional class name for the header cell */
  headerClassName?: string;
  /** Optional class name for the data cell */
  cellClassName?: string;
}

/**
 * Possible directions for sorting
 */
export type SortOrder = "asc" | "desc" | null;

/**
 * Configuration state for sorting
 */
export interface SortConfig {
  key: string | null;
  direction: SortOrder;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  className?: string;
  isLoading?: boolean;
}
