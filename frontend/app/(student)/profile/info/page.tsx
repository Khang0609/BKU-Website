"use client";

import { ProfileProvider } from "@/app/(student)/_context/ProfileContext";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";
import { LoadingError } from "@/app/(student)/_components/profile.info/LoadingError";
import { WebHeaderTitle } from "@/app/(student)/_components/profile/WebHeaderTitle";
import { AcademicInfo } from "@/app/(student)/_components/profile.info/info_grid/academic_info/AcademicInfo";
import PersonalInfo from "@/app/(student)/_components/profile.info/info_grid/personal_info/PersonalInfo";
import ContactInfo from "@/app/(student)/_components/profile.info/info_grid/contact_info/ContactInfo";
import GradutionInfo from "@/app/(student)/_components/profile.info/info_grid/graduation_info/GradutionInfo";
import BankAccountInfo from "@/app/(student)/_components/profile.info/info_grid/bank_account/BankAccountInfo";
import OtherInfo from "@/app/(student)/_components/profile.info/info_grid/other_info/OtherInfo";

const StudentDetailedInfoInner = () => {
  const { error } = useProfileContext();

  if (error) return <LoadingError error={error} />;

  return (
    <div className="min-h-full bg-slate-50 p-6 pb-24 lg:pb-0">
      {/* Top Header with Back Button */}
      <WebHeaderTitle
        title="Profile Information"
        description="View your detailed student records"
        className="mx-auto mb-8"
      />
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Main Grid: Academic, Personal (Top) & Contact (Bottom) */}
        <MainGrid />
        {/* Collapsible Accordions for Secondary Sections */}
        <CollapsibleGrid />
      </div>
    </div>
  );
};

const MainGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 1. ACADEMIC INFORMATION */}
      <AcademicInfo />
      {/* 2. PERSONAL DETAILS */}
      <PersonalInfo />
      {/* 3. CONTACT INFORMATION (Full Width) */}
      <ContactInfo />
    </div>
  );
};

const CollapsibleGrid = () => {
  return (
    <div className="space-y-4 pt-6">
      <GradutionInfo />
      <BankAccountInfo />
      <OtherInfo />
    </div>
  );
};

const StudentDetailedInfoPage = () => {
  return (
    <ProfileProvider>
      <StudentDetailedInfoInner />
    </ProfileProvider>
  );
};

export default StudentDetailedInfoPage;
