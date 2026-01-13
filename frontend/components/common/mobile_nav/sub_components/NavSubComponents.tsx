import React from "react";
import { Menu, X, Settings, LogOut } from "lucide-react";
import { useMobileNav } from "../MobileNavContext";

export const HamburgerButton = () => {
  const { setIsOpen } = useMobileNav();
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300/80 bg-gray-300/40 text-primary shadow-lg backdrop-blur-lg lg:hidden"
      aria-label="Open Menu"
    >
      <Menu size={24} />
    </button>
  );
};

export const NavHeader = () => {
  const { setIsOpen } = useMobileNav();
  return (
    <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
      <h2 className="text-lg font-bold tracking-wider">BKU PORTAL</h2>
      <button
        onClick={() => setIsOpen(false)}
        className="rounded-full p-1 hover:bg-white/10"
      >
        <X size={24} />
      </button>
    </div>
  );
};

export const NavFooter = () => {
  const { logout } = useMobileNav();
  return (
    <div className="space-y-2 border-t border-white/10 px-4 py-4">
      <button className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white">
        <Settings size={20} />
        <span>Settings</span>
      </button>
      <button
        onClick={logout}
        className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};
