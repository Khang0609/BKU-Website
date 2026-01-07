"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <TopNav />

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
