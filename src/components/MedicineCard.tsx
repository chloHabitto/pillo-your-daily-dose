import { cn } from "@/lib/utils";
import { DosageChip } from "./DosageChip";
import { Pill, Check } from "lucide-react";

interface Medicine {
  id: string;
  name: string;
  dosages: string[];
  selectedDosage?: string;
  isTaken: boolean;
  color?: string;
}

interface MedicineCardProps {
  medicine: Medicine;
  onSelectDosage: (medicineId: string, dosage: string) => void;
}

const pillColors: Record<string, string> = {
  blue: "text-blue-500",
  pink: "text-pink-500",
  yellow: "text-amber-500",
  green: "text-emerald-500",
  purple: "text-purple-500",
};

export const MedicineCard = ({ medicine, onSelectDosage }: MedicineCardProps) => {
  const hasMultipleDosages = medicine.dosages.length > 1;
  const isSelected = !!medicine.selectedDosage;
  const pillColor = pillColors[medicine.color || "blue"] || "text-primary";

  return (
    <div
      className={cn(
        "relative p-4 rounded-2xl transition-all duration-300 animate-fade-in",
        medicine.isTaken
          ? "bg-success-light border-2 border-success/30"
          : isSelected
          ? "bg-card-selected border-2 border-card-selected-border shadow-medium"
          : "bg-card border-2 border-transparent shadow-soft hover:shadow-medium"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Pill Icon */}
        <div className={cn(
          "p-2.5 rounded-xl",
          medicine.isTaken ? "bg-success/20" : "bg-primary-light"
        )}>
          {medicine.isTaken ? (
            <Check className="w-5 h-5 text-success" />
          ) : (
            <Pill className={cn("w-5 h-5", pillColor)} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={cn(
              "font-bold text-lg",
              medicine.isTaken ? "text-success" : "text-foreground"
            )}>
              {medicine.name}
            </h3>
            {medicine.isTaken && (
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                Taken ✓
              </span>
            )}
          </div>

          {/* Dosage Options */}
          <div className="flex flex-wrap gap-2">
            {medicine.dosages.map((dosage) => (
              <DosageChip
                key={dosage}
                dosage={dosage}
                isSelected={medicine.selectedDosage === dosage}
                isTaken={medicine.isTaken && medicine.selectedDosage === dosage}
                onClick={() => !medicine.isTaken && onSelectDosage(medicine.id, dosage)}
              />
            ))}
          </div>

          {/* Helper text for multiple dosages */}
          {hasMultipleDosages && !medicine.isTaken && !isSelected && (
            <p className="text-xs text-muted-foreground mt-2">
              Tap to select today's dosage
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
