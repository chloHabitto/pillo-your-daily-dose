import { cn } from "@/lib/utils";
import { Pill, AlertTriangle, ChevronRight } from "lucide-react";

export interface MedicationGroup {
  id: string;
  name: string;
  strengths: string[];
  form: string;
  totalStock: number;
  hasLowStock: boolean;
  color?: string;
}

interface MedicationGroupCardProps {
  medication: MedicationGroup;
  onClick: () => void;
}

const pillColors: Record<string, string> = {
  blue: "text-blue-500 bg-blue-50",
  pink: "text-pink-500 bg-pink-50",
  yellow: "text-amber-500 bg-amber-50",
  green: "text-emerald-500 bg-emerald-50",
  purple: "text-purple-500 bg-purple-50",
  red: "text-red-500 bg-red-50",
  orange: "text-orange-500 bg-orange-50",
  teal: "text-teal-500 bg-teal-50",
};

export const MedicationGroupCard = ({ medication, onClick }: MedicationGroupCardProps) => {
  const colorClasses = pillColors[medication.color || "blue"] || pillColors.blue;
  const [textColor, bgColor] = colorClasses.split(" ");

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-2xl transition-all duration-200",
        "bg-card border-2 border-transparent shadow-soft hover:shadow-medium",
        "flex items-center gap-3 text-left",
        "active:scale-[0.98]"
      )}
    >
      {/* Pill Icon */}
      <div className={cn("p-3 rounded-xl", bgColor)}>
        <Pill className={cn("w-5 h-5", textColor)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg text-foreground truncate">
            {medication.name}
          </h3>
          {medication.hasLowStock && (
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          )}
        </div>
        
        {/* Strength chips */}
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {medication.strengths.map((strength) => (
            <span
              key={strength}
              className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
            >
              {strength}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
          <span>{medication.form}</span>
          <span>•</span>
          <span className={cn(medication.hasLowStock && "text-amber-600 font-medium")}>
            {medication.totalStock} in stock
          </span>
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
    </button>
  );
};
