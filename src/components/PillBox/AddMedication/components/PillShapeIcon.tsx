import { cn } from "@/lib/utils";
import { PILL_COLORS } from "../types";

interface PillShapeIconProps {
  shape: string;
  colorLeft: string;
  colorRight?: string | null;
  showLine?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const getColorHex = (colorName: string): string => {
  const color = PILL_COLORS.find((c) => c.name === colorName);
  return color?.hex || colorName;
};

export const PillShapeIcon = ({
  shape,
  colorLeft,
  colorRight,
  showLine = false,
  size = "md",
  className,
}: PillShapeIconProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const leftHex = getColorHex(colorLeft);
  const rightHex = colorRight ? getColorHex(colorRight) : leftHex;

  const renderShape = () => {
    switch (shape) {
      case "capsule":
        return (
          <svg viewBox="0 0 48 24" className={cn(sizeClasses[size], className)}>
            <defs>
              <clipPath id="capsule-clip">
                <rect x="0" y="0" width="48" height="24" rx="12" />
              </clipPath>
            </defs>
            <g clipPath="url(#capsule-clip)">
              <rect x="0" y="0" width="24" height="24" fill={leftHex} />
              <rect x="24" y="0" width="24" height="24" fill={rightHex} />
            </g>
            <rect x="0" y="0" width="48" height="24" rx="12" fill="none" stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "round":
        return (
          <svg viewBox="0 0 32 32" className={cn(sizeClasses[size], className)}>
            <circle cx="16" cy="16" r="15" fill={leftHex} stroke="#00000020" strokeWidth="1" />
            {showLine && <line x1="4" y1="16" x2="28" y2="16" stroke="#00000030" strokeWidth="1.5" />}
          </svg>
        );

      case "oval":
        return (
          <svg viewBox="0 0 40 24" className={cn(sizeClasses[size], className)}>
            <ellipse cx="20" cy="12" rx="19" ry="11" fill={leftHex} stroke="#00000020" strokeWidth="1" />
            {showLine && <line x1="6" y1="12" x2="34" y2="12" stroke="#00000030" strokeWidth="1.5" />}
          </svg>
        );

      case "oblong":
        return (
          <svg viewBox="0 0 48 20" className={cn(sizeClasses[size], className)}>
            <rect x="0.5" y="0.5" width="47" height="19" rx="9.5" fill={leftHex} stroke="#00000020" strokeWidth="1" />
            {showLine && <line x1="24" y1="2" x2="24" y2="18" stroke="#00000030" strokeWidth="1.5" />}
          </svg>
        );

      case "triangle":
        return (
          <svg viewBox="0 0 32 28" className={cn(sizeClasses[size], className)}>
            <polygon points="16,2 30,26 2,26" fill={leftHex} stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "square":
        return (
          <svg viewBox="0 0 32 32" className={cn(sizeClasses[size], className)}>
            <rect x="2" y="2" width="28" height="28" rx="4" fill={leftHex} stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "diamond":
        return (
          <svg viewBox="0 0 32 32" className={cn(sizeClasses[size], className)}>
            <polygon points="16,2 30,16 16,30 2,16" fill={leftHex} stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "pentagon":
        return (
          <svg viewBox="0 0 32 32" className={cn(sizeClasses[size], className)}>
            <polygon points="16,2 30,12 25,28 7,28 2,12" fill={leftHex} stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "hexagon":
        return (
          <svg viewBox="0 0 32 28" className={cn(sizeClasses[size], className)}>
            <polygon points="8,2 24,2 30,14 24,26 8,26 2,14" fill={leftHex} stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "bottle":
        return (
          <svg viewBox="0 0 24 40" className={cn(sizeClasses[size], className)}>
            <rect x="7" y="2" width="10" height="6" rx="2" fill={rightHex || leftHex} stroke="#00000020" strokeWidth="1" />
            <rect x="4" y="8" width="16" height="30" rx="3" fill={leftHex} stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "cream-tube":
        return (
          <svg viewBox="0 0 20 40" className={cn(sizeClasses[size], className)}>
            <rect x="6" y="2" width="8" height="8" rx="1" fill={rightHex || "#6B7280"} stroke="#00000020" strokeWidth="1" />
            <rect x="3" y="10" width="14" height="28" rx="2" fill={leftHex} stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "dropper":
        return (
          <svg viewBox="0 0 16 40" className={cn(sizeClasses[size], className)}>
            <ellipse cx="8" cy="6" rx="5" ry="4" fill="#6B7280" stroke="#00000020" strokeWidth="1" />
            <rect x="5" y="10" width="6" height="20" fill={leftHex} stroke="#00000020" strokeWidth="1" />
            <polygon points="8,30 3,38 13,38" fill={leftHex} stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "inhaler":
        return (
          <svg viewBox="0 0 28 40" className={cn(sizeClasses[size], className)}>
            <rect x="8" y="2" width="12" height="24" rx="3" fill={leftHex} stroke="#00000020" strokeWidth="1" />
            <rect x="2" y="26" width="24" height="12" rx="2" fill={rightHex || "#6B7280"} stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "syringe":
        return (
          <svg viewBox="0 0 12 40" className={cn(sizeClasses[size], className)}>
            <rect x="4" y="2" width="4" height="6" fill="#6B7280" stroke="#00000020" strokeWidth="1" />
            <rect x="2" y="8" width="8" height="24" fill={leftHex} stroke="#00000020" strokeWidth="1" />
            <polygon points="6,32 3,38 9,38" fill="#6B7280" stroke="#00000020" strokeWidth="1" />
          </svg>
        );

      case "patch":
        return (
          <svg viewBox="0 0 36 36" className={cn(sizeClasses[size], className)}>
            <rect x="2" y="2" width="32" height="32" rx="4" fill={leftHex} stroke="#00000020" strokeWidth="1" />
            <rect x="10" y="10" width="16" height="16" rx="2" fill="#FFFFFF80" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 32 32" className={cn(sizeClasses[size], className)}>
            <circle cx="16" cy="16" r="15" fill={leftHex} stroke="#00000020" strokeWidth="1" />
          </svg>
        );
    }
  };

  return renderShape();
};
