"use client";

import { DashboardTitle } from "@/components/common";
import { QuickAccess } from "@/app/(student)/_components/dashboard/QuickAccess";
import { RecentStudentService } from "@/app/(student)/_components/dashboard/RecentStudentService";
import { ComingSoonSection } from "@/app/(student)/_components/dashboard/ComingSoonSection";
import { StatisticsCard } from "@/app/(student)/_components/dashboard/StatisticsCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen space-y-6 p-6 md:pb-8">
      {/* Welcome Header */}
      <DashboardTitle
        title="Welcome to Your Dashboard"
        description="Control center for all your academic and administrative needs"
      />

      {/* Quick Access Grid */}
      <QuickAccess />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Student Services */}
        <RecentStudentService />

        {/* Coming Soon Section */}
        <ComingSoonSection />
      </div>

      {/* Statistics Cards */}
      <StatisticsCard />
    </div>
  );
}
