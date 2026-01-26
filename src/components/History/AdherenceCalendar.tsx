import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
  isFuture
} from "date-fns";
import { cn } from "@/lib/utils";

interface DayAdherence {
  date: Date;
  status: "complete" | "partial" | "missed" | "none";
  percentage?: number;
}

interface AdherenceCalendarProps {
  adherenceData: DayAdherence[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export const AdherenceCalendar = ({ adherenceData, selectedDate, onSelectDate }: AdherenceCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const getAdherenceForDay = (date: Date): DayAdherence | undefined => {
    return adherenceData.find(d => isSameDay(d.date, date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "bg-success";
      case "partial": return "bg-warning";
      case "missed": return "bg-destructive/60";
      default: return "";
    }
  };

  return (
    <div className="bg-card rounded-2xl p-4 shadow-soft">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 rounded-xl hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h3 className="font-bold text-foreground">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button 
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 rounded-xl hover:bg-secondary transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Week Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, i) => (
          <div key={i} className="text-center text-xs font-medium text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const adherence = getAdherenceForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isTodayDate = isToday(day);
          const isFutureDate = isFuture(day);

          return (
            <button
              key={i}
              onClick={() => !isFutureDate && onSelectDate(day)}
              disabled={isFutureDate}
              className={cn(
                "aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all relative",
                !isCurrentMonth && "opacity-30",
                isSelected && "bg-primary text-primary-foreground",
                !isSelected && !isFutureDate && "hover:bg-secondary",
                isFutureDate && "opacity-40 cursor-not-allowed",
                isTodayDate && !isSelected && "ring-2 ring-primary ring-offset-1"
              )}
            >
              <span className={cn(
                "font-medium",
                isSelected ? "text-primary-foreground" : "text-foreground"
              )}>
                {format(day, "d")}
              </span>
              {/* Adherence Indicator */}
              {adherence && adherence.status !== "none" && !isSelected && (
                <div className={cn(
                  "absolute bottom-1 w-1.5 h-1.5 rounded-full",
                  getStatusColor(adherence.status)
                )} />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Complete</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">Partial</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <span className="text-xs text-muted-foreground">Missed</span>
        </div>
      </div>
    </div>
  );
};
