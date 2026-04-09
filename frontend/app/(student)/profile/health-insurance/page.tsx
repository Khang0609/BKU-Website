import React from "react";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/shared/StudentHeaderTitle";
import { getHealthInsuranceServer } from "@/services/health-insurance.service";
import { HealthInsuranceContent } from "./HealthInsuranceContent";

export default async function HealthInsurancePage() {
  const healthInsurance = await getHealthInsuranceServer();

  return (
    <div className="min-h-full space-y-8 bg-slate-50/50 p-6 pb-32">
      <WebHeaderTitle
        title="Bảo hiểm Y tế"
        description="Thông tin thẻ bảo hiểm y tế và bảo hiểm tai nạn của bạn"
      />

      <div className="mx-auto max-w-4xl">
        <HealthInsuranceContent data={healthInsurance} />
      </div>
    </div>
  );
}
