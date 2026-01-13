import { BaseSkeletonProps } from "@/types/ui";

export interface ChatWindowProps extends BaseSkeletonProps {
  selectedContact: string | null;
  messages: any[];
  onBack: () => void; // For mobile back navigation
  avatar?: string;
}

export interface MessageAvatarProps extends BaseSkeletonProps {
  avatar?: string;
  selectedContact: string | null;
  isOnline?: boolean;
  avatarOnly?: boolean;
}
// #region ---------ContactCard-----------
export interface ContactCardProps extends BaseSkeletonProps {
  contact: string;
  index: number;
  lastMessage: any;
  isSelected: boolean;
  onSelectContact: (contact: string) => void;
}

export interface ContactNameProps extends BaseSkeletonProps {
  contact: string;
  isRead: boolean;
}

export interface LastMessageProps extends BaseSkeletonProps {
  lastMessage: any;
  isRead: boolean;
}
// #endregion

// #region ---------Conversation List-----------
export interface ConversationListProps extends BaseSkeletonProps {
  contacts: string[];
  selectedContact: string | null;
  onSelectContact: (contact: string) => void;
  mockMessages: any[]; // Using any for simplicity as per existing code structure, ideally should be typed
}
// #endregion

// #region ---------Message Page-----------

