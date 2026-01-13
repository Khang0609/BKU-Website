"use client";

import { SearchBar } from "@/components/ui";
import { ContactCard } from "@/app/(student)/_components/message/parts/ContactCard";
import { useMessageContext } from "@/app/(student)/_context/MessageContext";

export default function ConversationList() {
  const {
    contacts,
    selectedContact,
    setSelectedContact,
    mockMessages,
    lastMessage: getLastMessage,
    isSelected: checkIsSelected,
  } = useMessageContext();

  return (
    <div className="flex h-full flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <SearchBar title="Chats" placeholder="Search Messenger" value={""} />

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact, index) => {
          const lastMessage = getLastMessage(contact, mockMessages);
          const isSelected = checkIsSelected(selectedContact, contact);

          return (
            <ContactCard
              key={index}
              index={index}
              contact={contact}
              lastMessage={lastMessage}
              isSelected={isSelected}
              onSelectContact={setSelectedContact}
            />
          );
        })}
      </div>
    </div>
  );
}
