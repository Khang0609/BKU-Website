import React from "react";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/shared/StudentHeaderTitle";
import { getScholarshipsServer } from "@/services/scholarship.service";
import { ScholarshipProvider } from "@/app/(student)/_context/ScholarshipContext";
import { ScholarshipPageContent } from "./ScholarshipPageContent";

export default async function ScholarshipsPage() {
  const scholarships = await getScholarshipsServer();

  return (
    <div className="min-h-full space-y-8 bg-slate-50/50 p-6 pb-32">
      <WebHeaderTitle
        title="Scholarships"
        description="View your scholarships and grants"
      />

      <ScholarshipProvider initialData={scholarships}>
        <ScholarshipPageContent />
      </ScholarshipProvider>
    </div>
  );
}
