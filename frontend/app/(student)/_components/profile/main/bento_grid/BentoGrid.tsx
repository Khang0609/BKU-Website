"use client";

import React from "react";
import { PersonalLegal, DynamicClusters, RightCol } from "./";

export const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* LEFT COLUMN */}
      <div className="space-y-6">
        {/* 1. Personal & Legal (Large Card) */}
        <PersonalLegal />

        {/* 2. Left Column Dynamic Clusters (e.g., Training) */}
        <DynamicClusters />
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6">
        <RightCol />
      </div>
    </div>
  );
};
