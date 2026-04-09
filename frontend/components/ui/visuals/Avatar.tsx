import { MessageAvatarProps } from "@/app/(student)/_types/message";
import { SkeletonCircle } from "./Skeleton";
import { ImageWithFallback } from "./ImageWithFallback";
import { cn } from "@/lib/utils";

export const Avatar = ({
  avatar,
  selectedContact,
  isOnline = true,
  isLoading,
  avatarOnly = false,
}: MessageAvatarProps) => {
  return (
    <div className="relative">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
        {isLoading ? (
          <SkeletonCircle />
        ) : avatar ? (
          <ImageWithFallback
            src={avatar}
            alt="Avatar"
            className="rounded-full"
            width={40}
            height={40}
          />
        ) : (
          selectedContact
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
        )}
      </div>
      {isOnline && avatarOnly && (
        <span
          className={cn(
            "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500",
          )}
        ></span>
      )}
    </div>
  );
};
