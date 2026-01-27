import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, Search } from "lucide-react";
import { StrengthEntry, EXTENDED_UNITS } from "./types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MedicationStrengthStepProps {
  strengths: StrengthEntry[];
  medicationName: string;
  onChange: (strengths: StrengthEntry[]) => void;
}

export const MedicationStrengthStep = ({
  strengths,
  medicationName,
  onChange,
}: MedicationStrengthStepProps) => {
  const [customUnit, setCustomUnit] = useState("");
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

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

  const handleAddCustomUnit = (id: string) => {
    if (customUnit.trim()) {
      updateStrength(id, "unit", customUnit.trim());
      setCustomUnit("");
      setOpenPopoverId(null);
    }
  };

  // Get valid strengths for the chip display
  const validStrengths = strengths.filter((s) => s.value.trim());

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          What's the strength?
        </h2>
        <p className="text-muted-foreground mt-2">
          Add one or more strength options for {medicationName || "this medication"}
        </p>
      </div>

      {/* Added strengths as chips */}
      {validStrengths.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {validStrengths
            .sort((a, b) => parseFloat(a.value) - parseFloat(b.value))
            .map((strength) => (
              <span
                key={strength.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
              >
                {strength.value}{strength.unit}
                <button
                  type="button"
                  onClick={() => removeStrength(strength.id)}
                  className="p-0.5 rounded-full hover:bg-primary-foreground/20 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
        </div>
      )}

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
              <Popover 
                open={openPopoverId === strength.id} 
                onOpenChange={(open) => setOpenPopoverId(open ? strength.id : null)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="h-12 w-24 rounded-xl justify-between font-medium"
                  >
                    {strength.unit}
                    <Search className="ml-1 h-3.5 w-3.5 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-0" align="end">
                  <Command>
                    <CommandInput 
                      placeholder="Search units..." 
                      value={customUnit}
                      onValueChange={setCustomUnit}
                    />
                    <CommandList>
                      <CommandEmpty>
                        <button
                          type="button"
                          onClick={() => handleAddCustomUnit(strength.id)}
                          className="w-full px-3 py-2 text-sm text-left hover:bg-accent"
                        >
                          Add "{customUnit}" as custom unit
                        </button>
                      </CommandEmpty>
                      <CommandGroup>
                        {EXTENDED_UNITS.map((unit) => (
                          <CommandItem
                            key={unit}
                            value={unit}
                            onSelect={() => {
                              updateStrength(strength.id, "unit", unit);
                              setOpenPopoverId(null);
                            }}
                          >
                            {unit}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
