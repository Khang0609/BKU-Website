"use client";

// Re-build trigger

import { useClientLayout } from "@/hooks/useClientLayout";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./mobile_nav/MobileNav";

export function ClientLayout({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) {
  const { isSidebarCollapsed, toggleSidebar, isLoading, showSidebar } =
    useClientLayout({ defaultCollapsed });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {showSidebar && <MobileNav />}
      {showSidebar && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={toggleSidebar}
          isLoading={isLoading}
        />
      )}
      <div className="relative flex-1 overflow-auto bg-slate-50">
        {children}
      </div>
    </div>
  );
}
