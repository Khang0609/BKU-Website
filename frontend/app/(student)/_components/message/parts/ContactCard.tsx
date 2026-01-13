import { motion } from "framer-motion";
import { ContactCardProps } from "@/app/(student)/_types/message";
import { Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useMessageContext } from "@/app/(student)/_context/MessageContext";
import {
  ContactNameProps,
  LastMessageProps,
} from "@/app/(student)/_types/message";

export const ContactCard = ({
  index,
  contact,
  lastMessage,
  isSelected,
  onSelectContact,
}: ContactCardProps) => {
  const { isRead: checkIsRead } = useMessageContext();
  const isRead = checkIsRead(lastMessage);
  return (
    <motion.button
      key={contact}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      onClick={() => onSelectContact(contact)}
      className={`flex w-full cursor-pointer items-center gap-3 p-3 transition-colors hover:bg-gray-50 ${
        isSelected ? "bg-blue-50/60" : ""
      }`}
    >
      {/* Avatar */}
      <Avatar selectedContact={contact} />

      {/* Info */}
      <div className="min-w-0 flex-1 text-left">
        <ContactName contact={contact} isRead={isRead} isLoading={false} />
        <ContactLastMessage
          lastMessage={lastMessage}
          isRead={isRead}
          isLoading={false}
        />
      </div>
    </motion.button>
  );
};

const ContactName = ({ contact, isRead, isLoading }: ContactNameProps) => (
  <h3
    className={cn("truncate text-sm font-semibold", {
      "text-gray-900": isRead,
      "text-gray-700": !isRead,
    })}
  >
    {isLoading ? "Loading..." : contact}
  </h3>
);

const ContactLastMessage = ({
  lastMessage,
  isRead,
  isLoading,
}: LastMessageProps) => (
  <div className="flex items-center gap-1">
    <p
      className={cn("truncate text-xs", {
        "font-semibold text-gray-900": isRead,
        "text-gray-500": !isRead,
      })}
    >
      {lastMessage?.content || "No messages yet"}
    </p>
    {isRead && (
      <span className="ml-auto h-2 w-2 flex-shrink-0 rounded-full bg-blue-600"></span>
    )}
  </div>
);
