"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMobileNavLogic } from "./useMobileNav";
import { MobileNavProvider } from "./MobileNavContext";
import {
  HamburgerButton,
  NavHeader,
  NavFooter,
  NavItem,
} from "./sub_components";

export function MobileNav() {
  const navLogic = useMobileNavLogic();
  const { isOpen, setIsOpen, role } = navLogic;

  if (!role) return null;

  return (
    <MobileNavProvider value={navLogic}>
      {/* Hamburger Button - Visible only on mobile */}
      <HamburgerButton />

      {/* Drawer Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[80%] min-w-[280px] max-w-sm flex-col bg-primary text-white shadow-2xl lg:hidden"
            >
              <div className="flex h-full flex-col">
                <NavHeader />
                <NavItem />
                <NavFooter />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MobileNavProvider>
  );
}
