"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // Don't show sidebar on login page
  const showSidebar = isAuthenticated && pathname !== "/";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {showSidebar && (
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      )}
      <div className="relative flex-1 overflow-auto bg-slate-50">
        {children}
      </div>
    </div>
  );
}
