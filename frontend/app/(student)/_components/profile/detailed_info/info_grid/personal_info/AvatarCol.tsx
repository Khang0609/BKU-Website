import React from "react";
import { User } from "lucide-react";
import { ImageWithFallback } from "@/components/ui";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";
import { SkeletonRec } from "@/components/ui";

const AvatarCol = () => {
  const { profile, isLoading } = useProfileContext();
  const WIDTH = 200;
  const HEIGHT = 200;
  return (
    <div className="flex-shrink-0 self-start">
      <div className="group relative h-32 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
        {isLoading ? (
          // TODO: DELETE FIXED SIZE FOR INSIDE STUFF
          <SkeletonRec width={WIDTH} height={HEIGHT} />
        ) : profile?.personal.avatar_url ? (
          <ImageWithFallback
            src={profile.personal.avatar_url}
            alt="Student Avatar"
            width={WIDTH}
            height={HEIGHT}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-300">
            <User size={32} />
            <span className="text-[10px] font-bold uppercase text-slate-400">
              No Img
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarCol;
