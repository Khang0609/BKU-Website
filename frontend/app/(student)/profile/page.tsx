"use client";

import { User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ProfileMainProvider,
  useProfileMainContext,
} from "@/app/(student)/_context/ProfileMainContext";

import { containerAnimation } from "@/configs/animation.config";
import { PageTitle } from "@/components/ui";
import { BentoGrid } from "@/app/(student)/_components/profile/main/bento_grid";
import { ProfileSkeleton } from "@/app/(student)/_components/profile/main/ProfileSkeleton";

const ProfilePageInner = () => {
  const { isLoading } = useProfileMainContext();

  return (
    <div className="relative min-h-full p-6 text-slate-800">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header - Simple Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PageTitle
            title="Student Profile"
            subtitle="Manage your personal information, records, and academic status."
            icon={User}
            className="mb-8"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <ProfileSkeleton key="skeleton" />
          ) : (
            <motion.div
              key="content"
              variants={containerAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <BentoGrid />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <ProfileMainProvider>
      <ProfilePageInner />
    </ProfileMainProvider>
  );
};

export default ProfilePage;
