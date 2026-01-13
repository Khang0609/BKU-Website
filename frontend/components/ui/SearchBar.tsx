"use client";

import { Search } from "lucide-react";
import { InputProps } from "@/types/searchBar";

export const SearchBar = ({
  title,
  placeholder,
  value,
  onChange,
  searchIcon = true,
}: InputProps) => {


  return (
    <div className="border-b border-gray-200 p-4">
      <h2 className="mb-4 text-xl font-bold text-gray-900">{title}</h2>
      <div className="relative">
        {searchIcon && (
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full rounded-full border-none bg-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
        />
      </div>
    </div>
  );
};
