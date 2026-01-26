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
        "px-3 py-1.5 rounded-full",
        "bg-primary text-primary-foreground",
        "shadow-soft hover:shadow-medium transition-all duration-200",
        "flex items-center gap-1.5",
        "animate-fade-in text-xs font-semibold"
      )}
    >
      <Calendar className="w-3.5 h-3.5" />
      <span>Today</span>
    </button>
  );
};
