import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface DosageChipProps {
  dosage: string;
  isSelected: boolean;
  isTaken?: boolean;
  onClick: () => void;
}

export const DosageChip = ({ dosage, isSelected, isTaken, onClick }: DosageChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
        isTaken
          ? "bg-success text-success-foreground"
          : isSelected
          ? "bg-chip-selected text-chip-selected-foreground shadow-soft"
          : "bg-chip text-chip-foreground hover:bg-chip/80"
      )}
    >
      {isTaken && <Check className="w-3.5 h-3.5 animate-check-bounce" />}
      {dosage}
    </button>
  );
};
