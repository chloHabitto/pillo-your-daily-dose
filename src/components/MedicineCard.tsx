import { cn } from "@/lib/utils";
import { Pill, Check, X } from "lucide-react";
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
}

const pillColors: Record<string, string> = {
  blue: "text-blue-500",
  pink: "text-pink-500",
  yellow: "text-amber-500",
  green: "text-emerald-500",
  purple: "text-purple-500",
};

export const MedicineCard = ({ medicine, onLog, onSkip }: MedicineCardProps) => {
  const pillColor = pillColors[medicine.color || "blue"] || "text-primary";
  const isTaken = medicine.status === "taken";
  const isSkipped = medicine.status === "skipped";
  const isPending = medicine.status === "pending";

  return (
    <div
      className={cn(
        "relative p-4 rounded-2xl transition-all duration-300 animate-fade-in",
        isTaken
          ? "bg-success-light border-2 border-success/30"
          : isSkipped
          ? "bg-muted/50 border-2 border-muted"
          : "bg-card border-2 border-transparent shadow-soft"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Pill Icon */}
        <div className={cn(
          "p-2.5 rounded-xl shrink-0",
          isTaken ? "bg-success/20" : isSkipped ? "bg-muted" : "bg-primary-light"
        )}>
          {isTaken ? (
            <Check className="w-5 h-5 text-success" />
          ) : isSkipped ? (
            <X className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Pill className={cn("w-5 h-5", pillColor)} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-bold text-lg truncate",
            isTaken ? "text-success" : isSkipped ? "text-muted-foreground" : "text-foreground"
          )}>
            {medicine.name}
          </h3>
          
          {/* Dosage display */}
          <p className={cn(
            "text-sm",
            isTaken ? "text-success/80" : isSkipped ? "text-muted-foreground" : "text-muted-foreground"
          )}>
            {isTaken && medicine.takenDosage
              ? `${medicine.takenDosage} taken`
              : isSkipped
              ? "Skipped"
              : medicine.dosages.join(" / ")}
          </p>
        </div>

        {/* Action Buttons */}
        {isPending && (
          <div className="flex gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => onSkip(medicine.id)}
            >
              Skip
            </Button>
            <Button
              size="sm"
              className="bg-success hover:bg-success/90 text-success-foreground"
              onClick={() => onLog(medicine.id)}
            >
              Log
            </Button>
          </div>
        )}

        {/* Status badge for taken/skipped */}
        {isTaken && (
          <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full shrink-0">
            ✓ Taken
          </span>
        )}
        {isSkipped && (
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full shrink-0">
            Skipped
          </span>
        )}
      </div>
    </div>
  );
};
