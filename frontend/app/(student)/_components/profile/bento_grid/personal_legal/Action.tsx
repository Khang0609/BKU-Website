"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, FileText, Briefcase } from "lucide-react";

export const Action = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <StudentRecords />
      <StudentDecision />
    </div>
  );
};

const StudentRecords = () => {
    return (
        <Link
        href="/profile/records"
        className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:border-[#003087]/20 hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#003087]">
            <FileText size={18} />
          </div>
          <span className="font-medium text-slate-700 group-hover:text-[#003087]">
            Student Records
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1" />
      </Link>
    );
}

const StudentDecision = () => {
    return (
        <Link
        href="/profile/records"
        className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:border-[#003087]/20 hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#003087]">
            <Briefcase size={18} />
          </div>
          <span className="font-medium text-slate-700 group-hover:text-[#003087]">
            Decisions
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1" />
      </Link>
    );
}
