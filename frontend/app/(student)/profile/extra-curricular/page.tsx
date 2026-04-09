import React from "react";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/shared/StudentHeaderTitle";
import { getExtraCurricularsServer } from "@/services/extra-curricular.service";
import { ExtraCurricularProvider } from "@/app/(student)/_context/ExtraCurricularContext";
import { ExtraCurricularPageContent } from "./ExtraCurricularPageContent";

export default async function ExtraCurricularPage() {
  const extraCurriculars = await getExtraCurricularsServer();

  return (
    <div className="min-h-full space-y-6 bg-slate-50/50 p-6 pb-32">
      <WebHeaderTitle
        title="Extra-Curricular Activities"
        description="Track your social work days and participation in campus activities"
      />

      <ExtraCurricularProvider initialData={extraCurriculars}>
        <ExtraCurricularPageContent />
      </ExtraCurricularProvider>
    </div>
  );
}
