import React from "react";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/shared/StudentHeaderTitle";
import { getDecisionsServer } from "@/services/decision.service";
import { DecisionPageContent } from "./DecisionPageContent";
import { DecisionProvider } from "@/app/(student)/_context/DecisionContext";

export default async function DecisionPage() {
  // Fetch dữ liệu ngay tại Server!
  const decisions = await getDecisionsServer();

  return (
    <div className="min-h-full space-y-8 bg-slate-50/50 p-6 pb-32">
      <WebHeaderTitle
        title="Decisions"
        description="View your decisions and status"
      />

      {/* Bọc Provider để truyền data xuống các hook/component con */}
      <DecisionProvider initialData={decisions}>
        <DecisionPageContent />
      </DecisionProvider>
    </div>
  );
}
