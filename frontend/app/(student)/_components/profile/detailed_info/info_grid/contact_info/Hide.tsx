import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GridItem } from "@/app/(student)/_components/profile/detailed_info/common";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";

const Hide = () => {
  const { cardExpanded, profile, val } = useProfileContext();
  return (
    <AnimatePresence>
      {cardExpanded.contact && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-6 overflow-hidden border-t border-dashed border-slate-200 pt-6"
        >
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
            <GridItem
              label="Personal Email"
              value={val(profile?.contact.personal_email)}
              subtle
            />
            <GridItem
              label="Family Phone"
              value={val(profile?.contact.family_phone)}
              subtle
            />
            <GridItem
              label="Dorm Room"
              value={val(profile?.contact.dorm_room)}
              subtle
            />
            <GridItem
              label="Permanent Address"
              value={val(profile?.permanent_address.permanent_full_address)}
              subtle
              className="md:col-span-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Hide;
