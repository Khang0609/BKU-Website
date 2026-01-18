"use client";

import { User } from "lucide-react";
import { motion } from "framer-motion";

import { ProfileMainProvider } from "@/app/(student)/_context/ProfileMainContext";

import { containerAnimation } from "@/configs/animation.config";
import { PageTitle } from "@/components/ui";
import {
  PersonalLegal,
  DynamicClusters,
  RightCol,
} from "@/app/(student)/_components/profile/main/bento_grid";

const ProfilePageInner = () => {
  return (
    <div className="relative min-h-full p-6 text-slate-800">
      {/* Toast Notification - Managed globally */}

      <motion.div
        variants={containerAnimation}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl space-y-6"
      >
        {/* Header */}
        <PageTitle
          title="Student Profile"
          subtitle="Manage your personal information, records, and academic status."
          icon={User}
          className="mb-8"
        />

        {/* Bento Grid layout */}
        <BentoGrid />
      </motion.div>
    </div>
  );
};

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* LEFT COLUMN */}
      <div className="space-y-6">
        {/* 1. Personal & Legal (Large Card) */}
        <PersonalLegal />

        {/* Left Column Dynamic Clusters (e.g., Training) */}
        {/* Left Column Dynamic Clusters (e.g., Training) */}
        <DynamicClusters />
      </div>

      {/* RIGHT COLUMN */}
      <RightCol />
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
