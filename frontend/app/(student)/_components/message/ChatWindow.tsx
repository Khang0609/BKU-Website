"use client";

import { NoConservation, MessageFeature, MessageList, MessageInput, InfoBrief } from "@/app/(student)/_components/message/parts";
import { BackButton } from "@/components/ui";
import { useMessageContext } from "@/app/(student)/_context/MessageContext";

export default function ChatWindow() {
  const {
    selectedContact,
    currentMessages: messages,
    setSelectedContact,
  } = useMessageContext();

  if (!selectedContact) {
    return <NoConservation />;
  }

  const onBack = () => setSelectedContact(null);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Chat Header */}
      <div className="z-10 flex items-center justify-between border-b border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Back Button (Mobile Only) */}
          <BackButton onBack={onBack} className="lg:hidden" />

          <InfoBrief name={selectedContact} />
        </div>

        <MessageFeature />
      </div>

      {/* Messages Area - Grow to fill space */}
      <MessageList />

      {/* Input Area */}
      <MessageInput />
    </div>
  );
}
