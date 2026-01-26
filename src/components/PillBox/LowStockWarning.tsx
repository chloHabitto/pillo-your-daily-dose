import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface LowStockWarningProps {
  medicationNames: string[];
}

export const LowStockWarning = ({ medicationNames }: LowStockWarningProps) => {
  if (medicationNames.length === 0) return null;

  return (
    <div className="p-4 rounded-2xl bg-accent-light border-2 border-accent/30 mb-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-accent/20">
          <AlertTriangle className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-bold text-accent">Low Stock Alert</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {medicationNames.length === 1 
              ? `${medicationNames[0]} is running low`
              : `${medicationNames.slice(0, -1).join(", ")} and ${medicationNames.slice(-1)} are running low`
            }
          </p>
        </div>
      </div>
    </div>
  );
};
