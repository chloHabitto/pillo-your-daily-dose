import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MEDICATION_FORMS } from "./types";
import { Check } from "lucide-react";

interface MedicationFormStepProps {
  form: string;
  customForm: string;
  onChange: (form: string) => void;
  onCustomFormChange: (customForm: string) => void;
}

export const MedicationFormStep = ({
  form,
  customForm,
  onChange,
  onCustomFormChange,
}: MedicationFormStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          What form is it?
        </h2>
        <p className="text-muted-foreground mt-2">
          Select the medication type
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MEDICATION_FORMS.map((formOption) => (
          <button
            key={formOption}
            type="button"
            onClick={() => onChange(formOption)}
            className={cn(
              "p-4 rounded-xl text-left transition-all duration-200",
              "border-2 flex items-center justify-between",
              form === formOption
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <span className={cn(
              "font-medium",
              form === formOption ? "text-primary" : "text-foreground"
            )}>
              {formOption}
            </span>
            {form === formOption && (
              <Check className="w-5 h-5 text-primary" />
            )}
          </button>
        ))}
      </div>

      {form === "Other" && (
        <div className="space-y-2 mt-4">
          <Label htmlFor="custom-form" className="text-base font-medium">
            Custom Form Name
          </Label>
          <Input
            id="custom-form"
            type="text"
            placeholder="Enter form name"
            value={customForm}
            onChange={(e) => onCustomFormChange(e.target.value)}
            className="h-12 rounded-xl"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};
