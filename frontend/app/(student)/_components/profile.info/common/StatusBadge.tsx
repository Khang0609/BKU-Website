import { useProfileContext } from "@/app/(student)/_context/ProfileContext";
import { Badge } from "@/components/ui";

const StatusBadge = ({ status }: { status: string }) => {
  const { isLoading } = useProfileContext();

  const isStudying = status === "Đang học" || status === "Studying";

  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        STATUS
      </span>
      <div className="mt-1">
        <Badge
          variant={isStudying ? "success" : "slate"}
          isLoading={isLoading}
          className="text-32 px-4 font-bold"
        >
          {status || "Unknown"}
        </Badge>
      </div>
    </div>
  );
};

export default StatusBadge;
