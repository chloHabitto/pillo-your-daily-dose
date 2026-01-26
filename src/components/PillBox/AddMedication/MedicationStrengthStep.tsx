import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { StrengthEntry, STRENGTH_UNITS } from "./types";

interface MedicationStrengthStepProps {
  strengths: StrengthEntry[];
  onChange: (strengths: StrengthEntry[]) => void;
}

export const MedicationStrengthStep = ({
  strengths,
  onChange,
}: MedicationStrengthStepProps) => {
  const addStrength = () => {
    onChange([
      ...strengths,
      { id: crypto.randomUUID(), value: "", unit: "mg" },
    ]);
  };

  const removeStrength = (id: string) => {
    if (strengths.length > 1) {
      onChange(strengths.filter((s) => s.id !== id));
    }
  };

  const updateStrength = (id: string, field: "value" | "unit", newValue: string) => {
    onChange(
      strengths.map((s) =>
        s.id === id ? { ...s, [field]: newValue } : s
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          What's the strength?
        </h2>
        <p className="text-muted-foreground mt-2">
          Add one or more strength options
        </p>
      </div>

      <div className="space-y-4">
        {strengths.map((strength, index) => (
          <div key={strength.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-muted-foreground">
                Strength {strengths.length > 1 ? index + 1 : ""}
              </Label>
              {strengths.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStrength(strength.id)}
                  className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <Input
                type="text"
                inputMode="decimal"
                placeholder="e.g., 500"
                value={strength.value}
                onChange={(e) => updateStrength(strength.id, "value", e.target.value)}
                className="h-12 rounded-xl flex-1"
              />
              <div className="flex gap-1 flex-wrap">
                {STRENGTH_UNITS.map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => updateStrength(strength.id, "unit", unit)}
                    className={cn(
                      "px-3 h-12 rounded-xl text-sm font-medium transition-all",
                      "border-2",
                      strength.unit === unit
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    )}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addStrength}
        className="w-full h-12 rounded-xl border-dashed border-2"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Strength
      </Button>
    </div>
  );
};
