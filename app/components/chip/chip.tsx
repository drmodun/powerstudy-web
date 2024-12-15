import { cn } from "@/lib/utils";
import React from "react";

export type ChipVariant =
  | "sapphire"
  | "ocean"
  | "forest"
  | "sunset"
  | "autumn"
  | "lavender"
  | "mint"
  | "coral"
  | "sky"
  | "neon"
  | "royal"
  | "sage"
  | "neutral"
  | "breeze"
  | "river"
  | "mountain"
  | "storm"
  | "mist"
  | "dawn"
  | "dusk"
  | "night"
  | "none";

interface ChipProps {
  label: string;
  variant: ChipVariant;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ChipVariant, string> = {
  sapphire: "bg-blue-600 text-white",
  ocean: "bg-cyan-600 text-white",
  forest: "bg-green-700 text-white",
  sunset: "bg-orange-500 text-white",
  autumn: "bg-amber-600 text-white",
  lavender: "bg-purple-400 text-white",
  mint: "bg-emerald-400 text-white",
  coral: "bg-red-400 text-white",
  sky: "bg-sky-400 text-white",
  neon: "bg-lime-400 text-black",
  royal: "bg-indigo-600 text-white",
  sage: "bg-green-500 text-white",
  neutral: "bg-gray-500 text-white",
  breeze: "bg-teal-300 text-black",
  river: "bg-blue-400 text-white",
  mountain: "bg-slate-600 text-white",
  storm: "bg-violet-600 text-white",
  mist: "bg-gray-400 text-black",
  dawn: "bg-rose-300 text-black",
  dusk: "bg-purple-500 text-white",
  night: "bg-slate-800 text-white",
  none: "display-none",
};

export const Chip: React.FC<ChipProps> = ({
  label,
  variant,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        onClick && "cursor-pointer hover:opacity-80",
        className
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
};
