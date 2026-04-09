"use client";

import { useProfileMainContext } from "@/app/(student)/_context/ProfileMainContext";
import { BentoGrid } from "@/app/(student)/_components/profile/main/bento_grid";
import { ProfileSkeleton } from "@/app/(student)/_components/profile/main/ProfileSkeleton";
import { MotionDiv, Presence } from "@/components/ui/motion";
import { containerAnimation } from "@/configs/animation.config";

export const ProfilePageContent = () => {
  const { isLoading } = useProfileMainContext();

  return (
    <Presence mode="wait">
      {isLoading ? (
        <ProfileSkeleton key="skeleton" />
      ) : (
        <MotionDiv
          key="content"
          variants={containerAnimation}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <BentoGrid />
        </MotionDiv>
      )}
    </Presence>
  );
};
