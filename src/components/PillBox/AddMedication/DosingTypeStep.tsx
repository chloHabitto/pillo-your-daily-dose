import { cn } from "@/lib/utils";
import { StrengthEntry } from "./types";
import { Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DosingTypeStepProps {
  dosingType: "fixed" | "flexible";
  strengths: StrengthEntry[];
  selectedStrengths: string[];
  fixedQuantity: number;
  onDosingTypeChange: (type: "fixed" | "flexible") => void;
  onSelectedStrengthsChange: (ids: string[]) => void;
  onFixedQuantityChange: (qty: number) => void;
}

export const DosingTypeStep = ({
  dosingType,
  strengths,
  selectedStrengths,
  fixedQuantity,
  onDosingTypeChange,
  onSelectedStrengthsChange,
  onFixedQuantityChange,
}: DosingTypeStepProps) => {
  const validStrengths = strengths.filter((s) => s.value.trim());

  const handleStrengthToggle = (id: string) => {
    if (dosingType === "fixed") {
      // Fixed mode: single selection
      onSelectedStrengthsChange([id]);
    } else {
      // Flexible mode: multi-selection
      if (selectedStrengths.includes(id)) {
        onSelectedStrengthsChange(selectedStrengths.filter((s) => s !== id));
      } else {
        onSelectedStrengthsChange([...selectedStrengths, id]);
      }
    }
  };

  const getSelectedStrength = () => {
    if (selectedStrengths.length === 0) return null;
    return validStrengths.find((s) => s.id === selectedStrengths[0]);
  };

  const calculateTotalDose = () => {
    const strength = getSelectedStrength();
    if (!strength) return null;
    const total = parseFloat(strength.value) * fixedQuantity;
    return `${total}${strength.unit}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          How do you take it?
        </h2>
        <p className="text-muted-foreground mt-2">
          Choose fixed or flexible dosing
        </p>
      </div>

      {/* Dosing Type Selection */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            onDosingTypeChange("fixed");
            onSelectedStrengthsChange([]);
          }}
          className={cn(
            "p-4 rounded-xl border-2 text-left transition-all",
            dosingType === "fixed"
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          <div className="font-semibold text-foreground mb-1">Fixed</div>
          <p className="text-sm text-muted-foreground">
            Same dose every time
          </p>
        </button>
        <button
          type="button"
          onClick={() => {
            onDosingTypeChange("flexible");
            onSelectedStrengthsChange([]);
          }}
          className={cn(
            "p-4 rounded-xl border-2 text-left transition-all",
            dosingType === "flexible"
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          <div className="font-semibold text-foreground mb-1">Flexible</div>
          <p className="text-sm text-muted-foreground">
            Dose can vary
          </p>
        </button>
      </div>

      {/* Strength Selection */}
      <div className="space-y-3 mt-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          {dosingType === "fixed" ? "Select strength" : "Select possible strengths"}
        </h3>
        
        {validStrengths.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No strengths added. Go back to add strengths.
          </p>
        ) : (
          <div className="space-y-2">
            {validStrengths.map((strength) => {
              const isSelected = selectedStrengths.includes(strength.id);
              return (
                <button
                  key={strength.id}
                  type="button"
                  onClick={() => handleStrengthToggle(strength.id)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <span className="font-medium text-foreground">
                    {strength.value}{strength.unit}
                  </span>
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    )}
                  >
                    {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quantity selector for fixed dosing */}
      {dosingType === "fixed" && selectedStrengths.length > 0 && (
        <div className="mt-6 p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">Quantity per dose</span>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onFixedQuantityChange(Math.max(1, fixedQuantity - 1))}
                disabled={fixedQuantity <= 1}
                className="h-8 w-8 rounded-full"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-semibold text-foreground">
                {fixedQuantity}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onFixedQuantityChange(fixedQuantity + 1)}
                className="h-8 w-8 rounded-full"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Total dose summary */}
          <div className="text-center pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">Total dose: </span>
            <span className="font-semibold text-foreground">{calculateTotalDose()}</span>
          </div>
        </div>
      )}

      {/* Flexible mode summary */}
      {dosingType === "flexible" && selectedStrengths.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-secondary/50">
          <p className="text-sm text-muted-foreground text-center">
            When logging, you'll choose from: {" "}
            {selectedStrengths
              .map((id) => {
                const s = validStrengths.find((v) => v.id === id);
                return s ? `${s.value}${s.unit}` : "";
              })
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};
