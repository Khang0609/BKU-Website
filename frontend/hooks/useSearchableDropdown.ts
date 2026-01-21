import { useState, useRef, useEffect, useMemo } from "react";

export interface SearchableOption<T> {
  value: T;
  label: string;
}

interface UseSearchableDropdownProps<T> {
  options: SearchableOption<T>[];
  value?: T | null;
}

export const useSearchableDropdown = <T extends string | number | object>({
  options = [],
  value,
}: UseSearchableDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch(""); // Reset search when closing
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options with useMemo for performance
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const lowerSearch = search.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(lowerSearch),
    );
  }, [options, search]);

  // Derive display label based on current value
  const displayLabel = useMemo(() => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) return selectedOption.label;

    // Fallback display logic
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    return "";
  }, [options, value]);

  return {
    isOpen,
    setIsOpen,
    search,
    setSearch,
    filteredOptions,
    containerRef,
    displayLabel,
  };
};
