import { cn } from "@/lib/utils";
import { Check, ChevronRight, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Medicine {
  id: string;
  name: string;
  dosages: string[];
  takenDosage?: string;
  status: "pending" | "taken" | "skipped";
  color?: string;
}

interface MedicineCardProps {
  medicine: Medicine;
  onLog: (medicineId: string) => void;
  onSkip: (medicineId: string) => void;
  onMore?: (medicineId: string) => void;
}

const pillColors: Record<string, string> = {
  blue: "bg-blue-100",
  pink: "bg-pink-100",
  yellow: "bg-amber-100",
  green: "bg-emerald-100",
  purple: "bg-purple-100",
};

export const MedicineCard = ({ medicine, onLog, onSkip, onMore }: MedicineCardProps) => {
  const pillBgColor = pillColors[medicine.color || "blue"] || "bg-primary-light";
  const isTaken = medicine.status === "taken";
  const isSkipped = medicine.status === "skipped";
  const isPending = medicine.status === "pending";

  return (
    <div className="relative p-4 rounded-2xl bg-card border border-border/50 shadow-soft animate-fade-in">
      <div className="flex items-start gap-3">
        {/* Pill Icon Placeholder */}
        <div className={cn(
          "w-12 h-12 rounded-xl shrink-0",
          pillBgColor
        )} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-foreground truncate">
            {medicine.name}
          </h3>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-2">
            {isPending && (
              <>
                <button
                  className="h-8 px-3 rounded-full border-2 border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors"
                  onClick={() => onLog(medicine.id)}
                >
                  Log as Taken
                </button>
                <button
                  className="h-8 px-4 rounded-full border border-border text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
                  onClick={() => onSkip(medicine.id)}
                >
                  Skip
                </button>
              </>
            )}

            {isTaken && (
              <div className="h-8 px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                Logged: {medicine.takenDosage}
              </div>
            )}

            {isSkipped && (
              <div className="h-8 px-4 rounded-full border border-border text-muted-foreground text-sm font-medium inline-flex items-center gap-0.5">
                <ChevronRight className="w-3.5 h-3.5 -mr-1" />
                <ChevronRight className="w-3.5 h-3.5" />
                Skipped
              </div>
            )}
          </div>
        </div>

        {/* More Button */}
        <button
          onClick={() => onMore?.(medicine.id)}
          className="p-1 -mr-1 -mt-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
