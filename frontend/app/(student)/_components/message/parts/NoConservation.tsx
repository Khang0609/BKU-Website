import { Send } from "lucide-react";

export const NoConservation = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-50 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <Send className="h-10 w-10 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900">Your Messages</h3>
      <p className="mt-2 text-gray-500">
        Send private photos and messages to a friend or group.
      </p>
    </div>
  );
};
