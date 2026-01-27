import { cn } from "@/lib/utils";
import { PILL_COLORS, BACKGROUND_COLORS, PILL_SHAPES } from "./types";
import { PillShapeIcon } from "./components/PillShapeIcon";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface ColorSelectionStepProps {
  shape: string;
  colorLeft: string;
  colorRight: string | null;
  colorBackground: string;
  onColorLeftChange: (color: string) => void;
  onColorRightChange: (color: string | null) => void;
  onColorBackgroundChange: (color: string) => void;
}

export const ColorSelectionStep = ({
  shape,
  colorLeft,
  colorRight,
  colorBackground,
  onColorLeftChange,
  onColorRightChange,
  onColorBackgroundChange,
}: ColorSelectionStepProps) => {
  const shapeConfig = PILL_SHAPES.find((s) => s.name === shape);
  const isTwoTone = shapeConfig?.twoTone || false;
  const bgColor = BACKGROUND_COLORS.find((c) => c.name === colorBackground);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Choose colors
        </h2>
        <p className="text-muted-foreground mt-2">
          Customize how your medication looks
        </p>
      </div>

      {/* Preview */}
      <div className="flex justify-center py-6">
        <div
          className="p-8 rounded-2xl"
          style={{ backgroundColor: bgColor?.hex || "#FFFFFF" }}
        >
          <PillShapeIcon
            shape={shape}
            colorLeft={colorLeft}
            colorRight={isTwoTone ? colorRight : null}
            size="lg"
          />
        </div>
      </div>

      {/* Primary / Left Color */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-muted-foreground">
          {isTwoTone ? "Left color" : "Pill color"}
        </Label>
        <div className="grid grid-cols-6 gap-2">
          {PILL_COLORS.map((color) => {
            const isSelected = colorLeft === color.name;
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => onColorLeftChange(color.name)}
                className={cn(
                  "relative aspect-square rounded-xl border-2 transition-all",
                  isSelected ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                )}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className={cn(
                        "w-5 h-5",
                        color.name === "white" || color.name === "yellow" || color.name === "beige"
                          ? "text-foreground"
                          : "text-white"
                      )}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Color (for two-tone shapes) */}
      {isTwoTone && (
        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">
            Right color
          </Label>
          <div className="grid grid-cols-6 gap-2">
            {PILL_COLORS.map((color) => {
              const isSelected = colorRight === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => onColorRightChange(color.name)}
                  className={cn(
                    "relative aspect-square rounded-xl border-2 transition-all",
                    isSelected ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                  )}
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check
                        className={cn(
                          "w-5 h-5",
                          color.name === "white" || color.name === "yellow" || color.name === "beige"
                            ? "text-foreground"
                            : "text-white"
                        )}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Background Color */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-muted-foreground">
          Background color
        </Label>
        <div className="grid grid-cols-6 gap-2">
          {BACKGROUND_COLORS.map((color) => {
            const isSelected = colorBackground === color.name;
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => onColorBackgroundChange(color.name)}
                className={cn(
                  "relative aspect-square rounded-xl border-2 transition-all",
                  isSelected ? "border-foreground scale-110" : "border-border hover:scale-105"
                )}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-5 h-5 text-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
