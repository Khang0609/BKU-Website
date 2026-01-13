import React from "react";
import { Search } from "lucide-react";
import {
  useSearchableDropdown,
  SearchableOption,
} from "./useSearchableDropdown";
import { cn } from "@/lib/utils";
import { TriggerButton } from "./TriggerButton";
import { ResultRender } from "./ResultRender";

interface SearchableDropdownProps<T> {
  options: SearchableOption<T>[];
  value: T | null | undefined;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string; // Container class override
}

const SearchInput = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => (
  <div className="sticky top-0 z-10 border-b border-slate-100 bg-white p-2">
    <div className="relative flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 transition-colors focus-within:border-blue-400 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-200">
      <Search size={14} className="text-slate-400" />
      <input
        autoFocus
        type="text"
        className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  </div>
);

export function SearchableDropdown<T extends string | number | object>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}: SearchableDropdownProps<T>) {
  const {
    isOpen,
    setIsOpen,
    search,
    setSearch,
    filteredOptions,
    containerRef,
    displayLabel,
  } = useSearchableDropdown({ options, value });

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col gap-1.5", className)}
    >
      <div className="relative">
        <TriggerButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          displayLabel={displayLabel}
          placeholder={placeholder}
        />

        {/* Dropdown Panel */}
        {isOpen && (
          <div className="animate-in fade-in zoom-in-95 absolute left-0 right-0 z-50 mt-1 max-h-60 min-w-[200px] overflow-hidden rounded-md border border-slate-200 bg-white shadow-xl duration-100">
            <SearchInput search={search} setSearch={setSearch} />

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto py-1">
              <ResultRender
                filteredOptions={filteredOptions}
                value={value}
                onChange={onChange}
                setIsOpen={setIsOpen}
                search={search}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
