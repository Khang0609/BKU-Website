import { SearchableDropdown } from "@/components/ui";
import { FieldProps } from "@/app/(student)/_types/record";
import { useRecordContext } from "@/app/(student)/_context/RecordContext";

export default function Field({
  label,
  value,
  onChange,
  id,
  type = "text",
  options,
  className = "",
}: FieldProps) {
  const { editMode, saving } = useRecordContext();
  const isEditing = editMode[id];
  const isSaving = saving[id];
  if (!isEditing) {
    return (
      <ReadOnlyField
        label={label}
        value={value}
        options={options}
        className={className}
      />
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold uppercase text-slate-500">
        {label}
      </span>
      {type === "select" && options ? (
        <SearchableDropdown
          value={value}
          onChange={(v: any) => onChange(v)}
          options={options}
        />
      ) : type === "date" ? (
        <DateField
          value={value}
          onChange={(v: any) => onChange(v)}
          className={className}
        />
      ) : (
        <TextField
          value={value}
          onChange={(v: any) => onChange(v)}
          className={className}
        />
      )}
    </div>
  );
}

const ReadOnlyField = ({ label, value, options, className = "" }: any) => {
  const displayValue = options
    ? options.find((opt: any) => opt.value == value)?.label || value
    : value;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-semibold uppercase text-slate-400">
        {label}
      </span>
      <span className="truncate font-medium text-slate-700">
        {displayValue || "-"}
      </span>
    </div>
  );
};

const DateField = ({ value, onChange, className = "" }: any) => {
  return (
    <input
      type="date"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500"
    />
  );
};

const TextField = ({ value, onChange, className = "" }: any) => {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500"
    />
  );
};
