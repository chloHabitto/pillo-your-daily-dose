import { cn } from "@/lib/utils";
import { MedicationFormData } from "./types";
import { Pill, Check } from "lucide-react";

interface MedicationReviewStepProps {
  data: MedicationFormData;
}

const colorClasses: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-500" },
  pink: { bg: "bg-pink-50", text: "text-pink-500" },
  yellow: { bg: "bg-amber-50", text: "text-amber-500" },
  green: { bg: "bg-emerald-50", text: "text-emerald-500" },
  purple: { bg: "bg-purple-50", text: "text-purple-500" },
  red: { bg: "bg-red-50", text: "text-red-500" },
  orange: { bg: "bg-orange-50", text: "text-orange-500" },
  teal: { bg: "bg-teal-50", text: "text-teal-500" },
};

export const MedicationReviewStep = ({ data }: MedicationReviewStepProps) => {
  const colors = colorClasses[data.color] || colorClasses.blue;
  const displayForm = data.form === "Other" && data.customForm 
    ? data.customForm 
    : data.form;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Review & Save
        </h2>
        <p className="text-muted-foreground mt-2">
          Make sure everything looks correct
        </p>
      </div>

      {/* Preview Card */}
      <div className={cn(
        "p-6 rounded-2xl bg-card border-2 border-border shadow-soft"
      )}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={cn("p-4 rounded-xl", colors.bg)}>
            <Pill className={cn("w-8 h-8", colors.text)} />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground">
              {data.name || "Medication Name"}
            </h3>
            
            {/* Strengths */}
            <div className="flex flex-wrap gap-2 mt-3">
              {data.strengths
                .filter((s) => s.value)
                .map((strength) => (
                  <span
                    key={strength.id}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                  >
                    {strength.value}{strength.unit}
                  </span>
                ))}
            </div>

            <p className="text-muted-foreground mt-3">
              {displayForm}
            </p>
          </div>
        </div>
      </div>

      {/* Summary List */}
      <div className="space-y-3">
        <SummaryItem 
          label="Name" 
          value={data.name} 
          isComplete={!!data.name} 
        />
        <SummaryItem 
          label="Form" 
          value={displayForm} 
          isComplete={!!data.form} 
        />
        <SummaryItem 
          label="Strengths" 
          value={data.strengths
            .filter((s) => s.value)
            .map((s) => `${s.value}${s.unit}`)
            .join(", ")} 
          isComplete={data.strengths.some((s) => s.value)} 
        />
        <SummaryItem 
          label="Color" 
          value={data.color.charAt(0).toUpperCase() + data.color.slice(1)} 
          isComplete={!!data.color} 
        />
      </div>
    </div>
  );
};

interface SummaryItemProps {
  label: string;
  value: string;
  isComplete: boolean;
}

const SummaryItem = ({ label, value, isComplete }: SummaryItemProps) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
    <span className="text-muted-foreground">{label}</span>
    <div className="flex items-center gap-2">
      <span className="font-medium text-foreground">{value || "—"}</span>
      {isComplete && (
        <Check className="w-4 h-4 text-success" />
      )}
    </div>
  </div>
);
