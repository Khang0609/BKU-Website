"use client";

import React from "react";
import { useProfileMainContext } from "@/app/(student)/_context/ProfileMainContext";
import { ProfileCardItem } from "@components/profile/core";

export const Action = () => {
  const { personalLegalItems } = useProfileMainContext();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {personalLegalItems.map((item, index) => (
        <ProfileCardItem
          key={index}
          label={item.label}
          href={item.href}
          icon={item.icon}
          className="mb-0 border border-slate-100 bg-white shadow-sm hover:border-[#003087]/20"
        />
      ))}
    </div>
  );
};
