import { Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";

interface InfoBriefProps {
  name: string;
  isOnline?: boolean;
  avatar?: string;
  avatarOnly?: boolean;
}

export const InfoBrief = ({
  name,
  isOnline,
  avatar,
  avatarOnly,
}: InfoBriefProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar
        avatar={avatar}
        selectedContact={name}
        isOnline={isOnline}
        avatarOnly={avatarOnly}
      />
      {!avatarOnly && (
        <div>
          <ContactName name={name} />
          <Status isOnline={isOnline} />
        </div>
      )}
    </div>
  );
};

const ContactName = ({ name }: { name: string }) => {
  return <h3 className="font-semibold leading-tight text-gray-900">{name}</h3>;
};

const Status = ({ isOnline }: { isOnline?: boolean }) => {
  return (
    <p
      className={cn("text-xs font-medium", {
        "text-green-600": isOnline,
        "text-gray-500": !isOnline,
      })}
    >
      {isOnline ? "Active now" : "Offline"}
    </p>
  );
};
