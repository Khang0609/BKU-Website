import { ReactNode } from "react";

interface ServiceFormProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  onSubmit: () => void;
}

export function ServiceForm({
  title,
  description,
  icon,
  children,
  onSubmit,
}: ServiceFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-white/80 text-sm">{description}</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">{children}</div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
}
