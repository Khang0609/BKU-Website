"use client";

import React from "react";
import { DataTable } from "@components/data-display";
import { DecisionProps, DecisionType } from "@/types/decision";
import { ColumnDef } from "@/types/components_type/data_table";
import { useDecisionContext } from "@/app/(student)/_context/DecisionContext";

export const DecisionPageContent = () => {
  const { decisions, isLoading } = useDecisionContext();

  const columns: ColumnDef<DecisionProps>[] = [
    { key: "semester", label: "Semester", sortable: true },
    { key: "decision_number", label: "Decision Number", sortable: true },
    { key: "decision_content", label: "Content", sortable: true },
    {
      key: "decision_type",
      label: "Type",
      sortable: true,
      render: (value) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            value === DecisionType.IN
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {value === DecisionType.IN ? "Quyết định vào" : "Quyết định khác"}
        </span>
      ),
    },
    { key: "signed_date", label: "Signed Date", sortable: true },
    { key: "decision_reason", label: "Reason" },
    { key: "note", label: "Note" },
  ];

  return (
    <DataTable
      columns={columns}
      data={decisions}
      isLoading={isLoading}
      className="rounded-lg bg-white shadow-md"
    />
  );
};
