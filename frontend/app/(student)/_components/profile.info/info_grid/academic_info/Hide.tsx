import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GridItem } from "@/app/(student)/_components/profile.info/common";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";

export const Hide = () => {
  const { profile, val, isLoading, cardExpanded } = useProfileContext();
  return (
    <AnimatePresence>
      {cardExpanded.academic && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-6 overflow-hidden border-t border-dashed border-slate-200 pt-6"
        >
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 text-sm md:grid-cols-2">
            <GridItem
              label="Entry Semester"
              value={val(profile?.academic.entry_semester)}
              subtle
            />
            <GridItem
              label="Standard Duration"
              value={val(profile?.academic.study_duration_standard)}
              subtle
            />
            <GridItem
              label="Education Level"
              value={val(profile?.academic.education_level)}
              subtle
            />
            <GridItem
              label="Training System"
              value={val(profile?.academic.training_system)}
              subtle
            />
            <GridItem
              label="Program"
              value={val(profile?.academic.program)}
              className="md:col-span-2"
              subtle
            />
            <GridItem
              label="Campus"
              value={val(profile?.academic.campus)}
              className="md:col-span-2"
              subtle
            />
            <GridItem
              label="Max Semesters"
              value={val(profile?.academic.max_semesters)}
              subtle
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
