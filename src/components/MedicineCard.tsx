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
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-4 rounded-full border-primary text-primary font-semibold hover:bg-primary/5"
                  onClick={() => onLog(medicine.id)}
                >
                  Log as Taken
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-4 rounded-full border-border text-muted-foreground font-medium hover:bg-muted/50"
                  onClick={() => onSkip(medicine.id)}
                >
                  Skip
                </Button>
              </>
            )}

            {isTaken && (
              <Button
                variant="default"
                size="sm"
                className="h-9 px-4 rounded-full bg-primary text-primary-foreground font-semibold pointer-events-none"
              >
                <Check className="w-4 h-4 mr-1" />
                Logged: {medicine.takenDosage}
              </Button>
            )}

            {isSkipped && (
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-full border-border text-muted-foreground font-medium pointer-events-none"
              >
                <ChevronRight className="w-3 h-3 -mr-1" />
                <ChevronRight className="w-3 h-3 mr-1" />
                Skipped
              </Button>
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
