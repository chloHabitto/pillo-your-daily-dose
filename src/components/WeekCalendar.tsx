import { cn } from "@/lib/utils";
import { format, addDays, startOfWeek, isSameDay, addWeeks, differenceInWeeks } from "date-fns";
import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { TodayButton } from "./TodayButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface WeekCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onJumpToToday: () => void;
}

export const WeekCalendar = ({
  selectedDate,
  onSelectDate,
  onJumpToToday
}: WeekCalendarProps) => {
  const today = useMemo(() => new Date(), []);
  const [weekOffset, setWeekOffset] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const currentWeekStart = useMemo(() => {
    const baseWeekStart = startOfWeek(today, { weekStartsOn: 0 });
    return addWeeks(baseWeekStart, weekOffset);
  }, [today, weekOffset]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(currentWeekStart, i);
      return {
        date,
        dayName: format(date, "EEE"),
        dayNumber: format(date, "d"),
        isToday: isSameDay(date, today),
        isSelected: isSameDay(date, selectedDate)
      };
    });
  }, [currentWeekStart, today, selectedDate]);

  const handleSelectDate = (date: Date) => {
    onSelectDate(date);
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      const baseWeekStart = startOfWeek(today, { weekStartsOn: 0 });
      const selectedWeekStart = startOfWeek(date, { weekStartsOn: 0 });
      const newOffset = differenceInWeeks(selectedWeekStart, baseWeekStart);
      setWeekOffset(newOffset);
      onSelectDate(date);
      setCalendarOpen(false);
    }
  };

  const handleJumpToToday = () => {
    setWeekOffset(0);
    onJumpToToday();
  };

  const showTodayButton = weekOffset !== 0 || !isSameDay(selectedDate, today);
  const monthYear = format(currentWeekStart, "MMMM yyyy");

  return <div className="space-y-3">
      {/* Month/Year Header with Today Button */}
      <div className="flex items-center justify-between h-7">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors">
              {monthYear}
              <ChevronDown className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleCalendarSelect}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        <TodayButton isVisible={showTodayButton} onClick={handleJumpToToday} />
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => <button key={day.date.toISOString()} onClick={() => handleSelectDate(day.date)} className={cn("flex flex-col items-center py-2.5 px-1 rounded-xl transition-all duration-200", day.isSelected ? "bg-primary text-primary-foreground shadow-medium" : "bg-card hover:bg-secondary")}>
            <span className={cn("text-[10px] font-medium uppercase tracking-wide", day.isSelected ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {day.dayName}
            </span>
            <span className={cn("text-base font-bold mt-0.5", day.isSelected ? "text-primary-foreground" : "text-foreground")}>
              {day.dayNumber}
            </span>
            {day.isToday && !day.isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />}
            {day.isToday && day.isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mt-0.5" />}
          </button>)}
      </div>
    </div>;
};