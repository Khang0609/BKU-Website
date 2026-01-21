import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GridItem } from "@/app/(student)/_components/profile/detailed_info/common";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";

const Hide = () => {
  const { cardExpanded, formatDate, val, profile } = useProfileContext();

  return (
    <AnimatePresence>
      {cardExpanded.personal && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-6 overflow-hidden border-t border-dashed border-slate-200 pt-6"
        >
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
            <GridItem
              label="ID Issue Date"
              value={formatDate(val(profile?.personal.id_issue_date))}
              subtle
            />
            <GridItem
              label="ID Issue Place"
              value={val(profile?.personal.id_issue_place)}
              subtle
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Hide;
