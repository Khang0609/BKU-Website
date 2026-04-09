"use client";

import { NavItem } from "./NavItem";
import { Settings, LogOut } from "lucide-react";

interface SidebarFooterProps {
  isCollapsed: boolean;
  logout: () => void;
}

export function SidebarFooter({ isCollapsed, logout }: SidebarFooterProps) {
  return (
    <div className="space-y-2 border-t border-secondary/20 px-3 py-4">
      <NavItem
        label="Settings"
        icon={Settings}
        isActive={false}
        isCollapsed={isCollapsed}
        href="/settings" // Assuming settings page
      />
      <NavItem
        isButton
        label="Logout"
        icon={LogOut}
        isActive={false}
        isCollapsed={isCollapsed}
        onClick={logout}
        href="#" // Just for semantic/tooltip purpose
      />
    </div>
  );
}
