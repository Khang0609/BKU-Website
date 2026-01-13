import { Image as ImageIcon, Send, Smile } from "lucide-react";
import { useMessageContext } from "@/app/(student)/_context/MessageContext";

export const MessageInput = () => {
  const { messageText, setMessageText, handleKeyDown } = useMessageContext();
  return (
    <div>
      <div className="border-t border-gray-200 bg-white p-3">
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 text-blue-600 hover:bg-gray-100">
            <ImageIcon size={24} />
          </button>
          <div className="flex flex-1 items-center rounded-full bg-gray-100 px-4 py-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Aa"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
              onKeyDown={handleKeyDown}
            />
            <button className="ml-2 text-blue-600 hover:text-blue-700">
              <Smile size={24} />
            </button>
          </div>
          <button
            onClick={() => {
              if (messageText.trim()) setMessageText("");
            }}
            className="rounded-full p-2 text-blue-600 hover:bg-blue-50"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
