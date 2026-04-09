import { useProfileContext } from "@/app/(student)/_context/ProfileContext";
import { Badge } from "@/components/ui";

export const StatusBadge = ({ status }: { status: string }) => {
  const { isLoading } = useProfileContext();

  const isStudying = status === "Đang học" || status === "Studying";

  return (
    <div className="group flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          STATUS
        </span>
      </div>
      <div>
        <Badge
          variant={isStudying ? "success" : "slate"}
          isLoading={isLoading}
          className="px-4"
        >
          {status || "Unknown"}
        </Badge>
      </div>
    </div>
  );
};