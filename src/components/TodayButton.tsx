import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface TodayButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

export const TodayButton = ({ isVisible, onClick }: TodayButtonProps) => {
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "px-4 py-2 rounded-full",
        "bg-primary text-primary-foreground",
        "shadow-elevated hover:shadow-medium transition-all duration-200",
        "flex items-center gap-2",
        "animate-fade-in"
      )}
    >
      <Calendar className="w-4 h-4" />
      <span className="text-sm font-semibold">Today</span>
    </button>
  );
};
