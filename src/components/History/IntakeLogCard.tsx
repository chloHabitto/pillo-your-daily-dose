import { format } from "date-fns";
import { Pill, Clock, FileText, Sun, Sunset, Moon, Sunrise } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntakeLog {
  id: string;
  medicationName: string;
  dosage: string;
  timeOfDay: "Morning" | "Afternoon" | "Evening" | "Night";
  takenAt: Date;
  color: string;
  notes?: string;
  stockDeducted?: number;
}

interface IntakeLogCardProps {
  log: IntakeLog;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  pink: "bg-pink-100 text-pink-600",
  yellow: "bg-amber-100 text-amber-600",
  green: "bg-emerald-100 text-emerald-600",
  purple: "bg-violet-100 text-violet-600",
  orange: "bg-orange-100 text-orange-600",
};

const timeOfDayIcons = {
  Morning: Sunrise,
  Afternoon: Sun,
  Evening: Sunset,
  Night: Moon,
};

export const IntakeLogCard = ({ log }: IntakeLogCardProps) => {
  const TimeIcon = timeOfDayIcons[log.timeOfDay];
  
  return (
    <div className="bg-card rounded-2xl p-4 shadow-soft">
      <div className="flex items-start gap-3">
        {/* Pill Icon */}
        <div className={cn(
          "p-2.5 rounded-xl",
          colorMap[log.color] || "bg-muted text-muted-foreground"
        )}>
          <Pill className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-bold text-foreground">{log.medicationName}</h4>
              <p className="text-sm text-muted-foreground font-medium">{log.dosage}</p>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground shrink-0">
              <TimeIcon className="w-4 h-4" />
              <span className="text-xs font-medium">{log.timeOfDay}</span>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-1.5 mt-2">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {format(log.takenAt, "h:mm a")}
            </span>
            {log.stockDeducted && (
              <span className="text-xs text-muted-foreground ml-2">
                • {log.stockDeducted} deducted
              </span>
            )}
          </div>

          {/* Notes */}
          {log.notes && (
            <div className="flex items-start gap-1.5 mt-2 p-2 bg-secondary rounded-lg">
              <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{log.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
