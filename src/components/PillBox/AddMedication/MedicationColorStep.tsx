import { cn } from "@/lib/utils";
import { PILL_COLORS } from "./types";
import { Check, Pill } from "lucide-react";

interface MedicationColorStepProps {
  color: string;
  onChange: (color: string) => void;
}

const colorClasses: Record<string, { bg: string; text: string; ring: string }> = {
  blue: { bg: "bg-blue-500", text: "text-blue-500", ring: "ring-blue-500" },
  pink: { bg: "bg-pink-500", text: "text-pink-500", ring: "ring-pink-500" },
  yellow: { bg: "bg-amber-500", text: "text-amber-500", ring: "ring-amber-500" },
  green: { bg: "bg-emerald-500", text: "text-emerald-500", ring: "ring-emerald-500" },
  purple: { bg: "bg-purple-500", text: "text-purple-500", ring: "ring-purple-500" },
  red: { bg: "bg-red-500", text: "text-red-500", ring: "ring-red-500" },
  orange: { bg: "bg-orange-500", text: "text-orange-500", ring: "ring-orange-500" },
  teal: { bg: "bg-teal-500", text: "text-teal-500", ring: "ring-teal-500" },
};

export const MedicationColorStep = ({ color, onChange }: MedicationColorStepProps) => {
  const selectedColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Choose a color
        </h2>
        <p className="text-muted-foreground mt-2">
          Pick a color to identify this medication
        </p>
      </div>

      {/* Preview */}
      <div className="flex justify-center mb-8">
        <div className={cn(
          "w-20 h-20 rounded-2xl flex items-center justify-center",
          selectedColor.bg,
          "bg-opacity-20"
        )}>
          <Pill className={cn("w-10 h-10", selectedColor.text)} />
        </div>
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-4 gap-4">
        {PILL_COLORS.map((colorOption) => {
          const classes = colorClasses[colorOption.name];
          const isSelected = color === colorOption.name;
          
          return (
            <button
              key={colorOption.name}
              type="button"
              onClick={() => onChange(colorOption.name)}
              className={cn(
                "aspect-square rounded-2xl transition-all duration-200",
                "flex items-center justify-center",
                classes.bg,
                isSelected && "ring-4 ring-offset-2 ring-offset-background",
                isSelected && classes.ring,
                "hover:scale-105 active:scale-95"
              )}
            >
              {isSelected && (
                <Check className="w-6 h-6 text-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
