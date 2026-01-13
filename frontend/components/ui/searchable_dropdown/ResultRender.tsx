import React from "react";
import { Check } from "lucide-react";
import { SearchableOption } from "./useSearchableDropdown";

interface ResultRenderProps<T> {
  filteredOptions: SearchableOption<T>[];
  value: T | null | undefined;
  onChange: (value: T) => void;
  setIsOpen: (isOpen: boolean) => void;
  search: string;
}

export const ResultRender = <T,>({
  filteredOptions,
  value,
  onChange,
  setIsOpen,
  search,
}: ResultRenderProps<T>) => {
  return (
    <>
      {filteredOptions.length > 0 ? (
        filteredOptions.map((option, index) => {
          const isSelected = option.value === value;
          return (
            <div
              key={`${option.label}-${index}`}
              className={`relative flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-blue-50 ${
                isSelected
                  ? "bg-blue-50 font-medium text-blue-700"
                  : "text-slate-700"
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span className="truncate">{option.label}</span>
              {isSelected && (
                <Check size={14} className="flex-shrink-0 text-blue-600" />
              )}
            </div>
          );
        })
      ) : (
        <div className="px-3 py-4 text-center text-xs italic text-slate-400">
          No results found for &quot;{search}&quot;
        </div>
      )}
    </>
  );
};
