"use client";

import React, { useEffect } from "react";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/shared/StudentHeaderTitle";
import { useDecision } from "@/hooks/useDecision";
import { DataTable } from "@/components/common/data_table/DataTable";
import { DecisionProps, DecisionType } from "@/types/decision";
import { ColumnDef } from "@/components/common/data_table/types";
import { useToast } from "@/hooks/useToast";

const DecisionInner = () => {
  const { decisions, isLoading, error } = useDecision();

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

  const { showToast } = useToast();

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error, showToast]);

  return (
    <div className="min-h-full space-y-8 bg-slate-50/50 p-6 pb-32">
      <WebHeaderTitle
        title="Decisions"
        description="View your decisions and status"
      />

      <DataTable
        columns={columns}
        data={decisions}
        isLoading={isLoading}
        className="rounded-lg bg-white shadow-md"
      />
    </div>
  );
};

export default function Decision() {
  return (
    <div>
      <DecisionInner />
    </div>
  );
}
