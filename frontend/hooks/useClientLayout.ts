import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";

interface UseClientLayoutProps {
  defaultCollapsed?: boolean;
}

export const useClientLayout = ({
  defaultCollapsed = false,
}: UseClientLayoutProps = {}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(defaultCollapsed);
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  const toggleSidebar = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
    Cookies.set("sidebarCollapsed", String(collapsed), { expires: 365 });
  };

  // Don't show sidebar on login page, but show it during loading or if authenticated
  const showSidebar = (isAuthenticated || isLoading) && pathname !== "/";

  return {
    isSidebarCollapsed,
    toggleSidebar,
    isLoading,
    showSidebar,
  };
};
