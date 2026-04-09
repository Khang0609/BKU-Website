import React from "react";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/shared/StudentHeaderTitle";
import { getTrainingPointsServer } from "@/services/training-point.service";
import { TrainingPointProvider } from "@/app/(student)/_context/TrainingPointContext";
import { TrainingPointPageContent } from "./TrainingPointPageContent";

export default async function TrainingPointPage() {
  const trainingPoints = await getTrainingPointsServer();

  return (
    <div className="min-h-full space-y-6 bg-slate-50/50 p-6 pb-32">
      <WebHeaderTitle
        title="Training Points"
        description="Monitor your training performance results by semester"
      />

      <TrainingPointProvider initialData={trainingPoints}>
        <TrainingPointPageContent />
      </TrainingPointProvider>
    </div>
  );
}
