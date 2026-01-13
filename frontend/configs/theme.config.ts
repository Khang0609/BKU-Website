export const BADGE_COLORS = {
  success: {
    bg: "bg-green-50",
    text: "text-green-700",
    ring: "ring-green-600/20",
  },
  warning: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    ring: "ring-yellow-600/20",
  },
  error: {
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-600/10",
  },
  info: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-700/10",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    ring: "ring-purple-700/10",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-800",
    ring: "ring-orange-600/20",
  },
  pink: {
    bg: "bg-pink-50",
    text: "text-pink-700",
    ring: "ring-pink-700/10",
  },
  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    ring: "ring-cyan-700/10",
  },
  slate: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    ring: "ring-slate-500/10",
  },
} as const;

export type BadgeColorKey = keyof typeof BADGE_COLORS;
