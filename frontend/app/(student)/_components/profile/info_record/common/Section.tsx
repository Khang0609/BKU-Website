import React from "react";
import { Loader2 } from "lucide-react";
import { Check } from "lucide-react";
import { Edit2 } from "lucide-react";
import { SectionProps } from "@/app/(student)/_types/profile/record";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";

export const Section = ({
  title,
  icon,
  children,
  id,
  className = "",
}: SectionProps) => {
  const { editMode, toggleEdit, saving, handleSave } = useRecordContext();
  const isEditing = editMode[id];
  const isSaving = saving[id];
  const onEdit = () => toggleEdit(id);
  const onSave = () => handleSave(id);
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between rounded-t-xl border-b border-slate-100 bg-slate-50/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2 text-blue-700">{icon}</div>
          <h3 className="font-bold text-slate-800">{title}</h3>
        </div>
        {onEdit && (
          <button
            onClick={isEditing ? onSave : onEdit}
            disabled={isSaving}
            className={`rounded-full p-2 transition-colors ${
              isEditing
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "text-slate-500 hover:bg-slate-100"
            } ${isSaving ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : isEditing ? (
              <Check size={18} />
            ) : (
              <Edit2 size={16} />
            )}
          </button>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};
