"use client";

import { Loader2 } from "lucide-react";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";
import {
  TopHeader,
  PersonalSection,
  PermAddressSection,
  ContactSection,
  RelativeSection,
  PhotoSection,
  OtherSection,
} from "@/app/(student)/_components/profile/info_record/sections";

export const RecordPageContent = () => {
  const { isLoading, profile } = useRecordContext();
  
  if (isLoading || !profile)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="min-h-full space-y-8 bg-slate-50/50 p-6 pb-32">
      {/* Header */}
      <TopHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Personal */}
        <PersonalSection />

        {/* 2. Permanent Address */}
        <PermAddressSection />

        {/* 3. Contact Info */}
        <ContactSection />

        {/* 4. Relatives */}
        <RelativeSection />

        {/* 5. Photo Record */}
        <PhotoSection />

        {/* 6. Others */}
        <OtherSection />
      </div>
    </div>
  );
};
