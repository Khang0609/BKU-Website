import {
  LucideIcon,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  AlertTriangle,
} from "lucide-react";

export type ToastType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "coming_soon";

interface ToastPreset {
  bg: string;
  text: string;
  icon: LucideIcon;
  defaultMessage: string;
}

export const TOAST_PRESETS: Record<ToastType, ToastPreset> = {
  success: {
    bg: "bg-green-50",
    text: "text-green-700",
    icon: CheckCircle,
    defaultMessage: "Operation successful!",
  },
  error: {
    bg: "bg-red-50",
    text: "text-red-700",
    icon: AlertCircle,
    defaultMessage: "Something went wrong!",
  },
  info: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    icon: Info,
    defaultMessage: "Here is some information.",
  },
  warning: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    icon: AlertTriangle,
    defaultMessage: "Warning!",
  },
  coming_soon: {
    bg: "bg-slate-900",
    text: "text-white",
    icon: Clock,
    defaultMessage: "Coming Soon in next update!",
  },
};
