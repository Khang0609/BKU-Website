import { Phone, Video, Info } from "lucide-react";

export const MessageFeature = () => {
  return (
    <div className="flex items-center gap-2 text-blue-600">
      <button className="rounded-full p-2 hover:bg-blue-50">
        <Phone size={20} />
      </button>
      <button className="rounded-full p-2 hover:bg-blue-50">
        <Video size={20} />
      </button>
      <button className="rounded-full p-2 hover:bg-blue-50">
        <Info size={20} />
      </button>
    </div>
  );
};
