import { useState } from "react";
import { cn } from "@/lib/utils";
import { PILL_SHAPES, COMMON_SHAPES } from "./types";
import { PillShapeIcon } from "./components/PillShapeIcon";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

interface ShapeSelectionStepProps {
  shape: string;
  showLine: boolean;
  colorLeft: string;
  colorRight: string | null;
  onShapeChange: (shape: string) => void;
  onShowLineChange: (showLine: boolean) => void;
}

export const ShapeSelectionStep = ({
  shape,
  showLine,
  colorLeft,
  colorRight,
  onShapeChange,
  onShowLineChange,
}: ShapeSelectionStepProps) => {
  const [showMore, setShowMore] = useState(false);

  const commonShapes = PILL_SHAPES.filter((s) => COMMON_SHAPES.includes(s.name));
  const moreShapes = PILL_SHAPES.filter((s) => !COMMON_SHAPES.includes(s.name));
  const displayShapes = showMore ? PILL_SHAPES : commonShapes;

  const selectedShapeConfig = PILL_SHAPES.find((s) => s.name === shape);
  const showLineToggle = selectedShapeConfig && "hasLine" in selectedShapeConfig ? selectedShapeConfig.hasLine : false;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Choose a shape
        </h2>
        <p className="text-muted-foreground mt-2">
          Select how your medication looks
        </p>
      </div>

      {/* Preview */}
      <div className="flex justify-center py-6">
        <div className="p-6 rounded-2xl bg-secondary/50">
          <PillShapeIcon
            shape={shape}
            colorLeft={colorLeft}
            colorRight={colorRight}
            showLine={showLine}
            size="lg"
          />
        </div>
      </div>

      {/* Common Shapes */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-muted-foreground">Common</Label>
        <div className="grid grid-cols-4 gap-3">
          {commonShapes.map((shapeOption) => {
            const isSelected = shape === shapeOption.name;
            return (
              <button
                key={shapeOption.name}
                type="button"
                onClick={() => onShapeChange(shapeOption.name)}
                className={cn(
                  "relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <PillShapeIcon
                  shape={shapeOption.name}
                  colorLeft={colorLeft}
                  colorRight={shapeOption.twoTone ? colorRight : null}
                  size="sm"
                />
                <span className="text-xs font-medium text-foreground">
                  {shapeOption.label}
                </span>
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* More Shapes */}
      {showMore && (
        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">More</Label>
          <div className="grid grid-cols-4 gap-3">
            {moreShapes.map((shapeOption) => {
              const isSelected = shape === shapeOption.name;
              return (
                <button
                  key={shapeOption.name}
                  type="button"
                  onClick={() => onShapeChange(shapeOption.name)}
                  className={cn(
                    "relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <PillShapeIcon
                    shape={shapeOption.name}
                    colorLeft={colorLeft}
                    colorRight={shapeOption.twoTone ? colorRight : null}
                    size="sm"
                  />
                  <span className="text-xs font-medium text-foreground">
                    {shapeOption.label}
                  </span>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Show more button */}
      <button
        type="button"
        onClick={() => setShowMore(!showMore)}
        className="w-full p-3 rounded-xl text-sm font-medium text-primary flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
      >
        {showMore ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Show less
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Show more shapes
          </>
        )}
      </button>

      {/* Score line toggle */}
      {showLineToggle && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
          <div>
            <Label className="font-medium text-foreground">Show score line</Label>
            <p className="text-sm text-muted-foreground">
              Display a line across the pill
            </p>
          </div>
          <Switch
            checked={showLine}
            onCheckedChange={onShowLineChange}
          />
        </div>
      )}
    </div>
  );
};
