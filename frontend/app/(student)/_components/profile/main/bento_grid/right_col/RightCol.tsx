"use client";

import React from "react";
import { useProfileMainContext } from "@/app/(student)/_context/ProfileMainContext";
import { ProfileCard, ProfileCardItem } from "@/components/profile/core";

export const RightCol = () => {
  const { rightColClusters } = useProfileMainContext();

  return (
    <div className="space-y-6">
      {rightColClusters.map((cluster) => (
        <ProfileCard key={cluster.id} title={cluster.title} icon={cluster.icon}>
          {cluster.items.map((item, idx) => (
            <ProfileCardItem
              key={idx}
              label={item.label}
              desc={item.desc}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </ProfileCard>
      ))}
    </div>
  );
};
