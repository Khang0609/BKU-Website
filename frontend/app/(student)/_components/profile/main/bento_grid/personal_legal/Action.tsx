"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useProfileMainContext } from "@/app/(student)/_context/ProfileMainContext";

export const Action = () => {
  const { personalLegalItems, handleLinkClick } = useProfileMainContext();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {personalLegalItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={index}
            href={item.href}
            onClick={(e) => handleLinkClick(e, item.href)}
            className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:border-[#003087]/20 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#003087]">
                <Icon size={18} />
              </div>
              <span className="font-medium text-slate-700 group-hover:text-[#003087]">
                {item.label}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1" />
          </Link>
        );
      })}
    </div>
  );
};
