import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface LogButtonProps {
  isVisible: boolean;
  selectedCount: number;
  onClick: () => void;
}

export const LogButton = ({ isVisible, selectedCount, onClick }: LogButtonProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 max-w-lg mx-auto animate-slide-up">
      <button
        onClick={onClick}
        className={cn(
          "w-full py-4 px-6 rounded-2xl font-bold text-lg",
          "bg-accent text-accent-foreground",
          "shadow-elevated hover:shadow-medium transition-all duration-200",
          "active:scale-[0.98]",
          "flex items-center justify-center gap-2"
        )}
      >
        <Check className="w-5 h-5" />
        Log {selectedCount} as Taken
      </button>
    </div>
  );
};
