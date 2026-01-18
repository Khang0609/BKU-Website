import { ChevronDown } from "lucide-react";
import { useProfileContext } from "@/app/(student)/_context/ProfileContext";
import { ProfileCardProps } from "@/app/(student)/_types/profile/info";

export const ProfileCard = ({ title, icon, children, id }: ProfileCardProps) => {
  const { cardExpanded, toggleCard } = useProfileContext();
  const isExpanded = cardExpanded[id];
  return (
    <div className="relative flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div>
        <div className="mb-6 flex items-center gap-3">
          <div className="text-blue-600/80">{icon}</div>
          <h3 className="font-bold text-slate-800">{title}</h3>
        </div>
        {children}
      </div>

      {/* Show More Toggle - Centered at bottom or integrated */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => toggleCard(id)}
          className="flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-blue-600"
        >
          {isExpanded ? "Show Less" : "Show More"}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};
