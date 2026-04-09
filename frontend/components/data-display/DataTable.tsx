import React from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown, Loader2 } from "lucide-react";
import { DataTableProps } from "@/types/components_type/data_table";
import { cn } from "@/lib/utils";

export const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  sortConfig,
  onSort,
  className = "",
  isLoading = false,
}: DataTableProps<T>) => {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm",
        className,
      )}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full table-auto border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#004a80] text-white">
              {columns.map((col) => {
                const isSortable = col.sortable && onSort;
                const isSorted = sortConfig?.key === col.key;

                return (
                  <th
                    key={String(col.key)}
                    className={`whitespace-nowrap px-6 py-4 font-bold uppercase tracking-wider ${
                      isSortable
                        ? "cursor-pointer select-none hover:bg-[#003d6b]"
                        : ""
                    } ${col.headerClassName || ""}`}
                    onClick={() => isSortable && onSort(col.key as string)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{col.label}</span>
                      {isSortable && (
                        <span className="text-white/70">
                          {isSorted ? (
                            sortConfig.direction === "asc" ? (
                              <ChevronUp size={16} className="text-white" />
                            ) : (
                              <ChevronDown size={16} className="text-white" />
                            )
                          ) : (
                            <ChevronsUpDown size={16} />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-32 text-center align-middle"
                >
                  <div className="flex w-full items-center justify-center gap-2 text-gray-500">
                    <Loader2 size={24} className="animate-spin text-blue-600" />
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-colors hover:bg-blue-50/50 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  {columns.map((col) => {
                    // Extract value from item safely
                    const value = item[col.key];
                    return (
                      <td
                        key={`${index}-${String(col.key)}`}
                        className={`whitespace-nowrap px-6 py-4 text-gray-700 ${
                          col.cellClassName || ""
                        }`}
                      >
                        {col.render ? col.render(value, item) : value}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center italic text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
